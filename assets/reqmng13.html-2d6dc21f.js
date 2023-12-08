import{_ as p,o as e,c as a,a as i}from"./app-f0851ed3.js";const r={},l=i('<h1 id="怎么做需求分析" tabindex="-1"><a class="header-anchor" href="#怎么做需求分析" aria-hidden="true">#</a> 怎么做需求分析</h1><p>在具体的研究需求分析之前，我们先了解一下软件工程这个概念。软件工程分为三个层次，过程层、方法层、工具层。在最基础的过程层，最重要的就是一组被称为关键过程区域（KPAs）的框架（KPA的概念在讨论CMM的书中有详细的概念说明）。关键过程区域构成了软件项目的管理控制的基础，并且确立了上下文各区域的关系，其中规定了技术方法的采用、工程产品的，模型、文档、数据、报告、表格等，等的产生、里程碑的建立、质量的保证及变化的适当管理。方法层主要是过程在技术上的实现。它解决的问题是如何做。软件工程方法涵盖了一系列的任务：需求分析、设计、编程、测试、维护。同时他还包括了一组基本原则，控制了每一个的关键过程区域。工具层就很好理解了，他对过程层和方法层提供了自动和半自动的支持。这些辅助工具就称为CASE。</p><p>可以看到需求分析的位置，但是事实上需求分析是跨越了软件工程的三个层次的。这一点是和其他的过程是一样的。当然我们这里比较重点强调的是在软件工程的方法层，同时也涉及到一些过程层的思想，至于工具层则不再我们的讨论之列，但是会提到一些很适合在需求分析时应用的工具，诸如Word、Excel、Visio等。</p><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2><p>需求分析都包括了哪些方法呢？这里列举出在《需求分析》一书中推荐的一些方法，</p><ol><li><p>绘制系统关联图，这种关联图是用于定义系统与系统外部实体间的界限和接口的简单模型。同时它也明确了通过接口的信息流和物质流。</p></li><li><p>创建用户接口原型，当开发人员或用户不能确定需求时，开发一个用户接口原型—一个可能的局部实现—这样使得许多概念和可能发生的事更为直观明了。用户通过评价原型将使项目参与者能更好地相互理解所要解决的问题。注意要找出需求文档与原型之间所有的冲突之处。</p></li><li><p>分析需求可行性，在允许的成本、性能要求下，分析每项需求实施的可行性，明确与每项需求实现相联系的风险，包括与其它需求的冲突，对外界因素的依赖和技术障碍。</p></li><li><p>确定需求的优先级别，应用分析方法来确定使用实例、产品特性或单项需求实现的优先级别。以优先级为基础确定产品版本将包括哪些特性或哪类需求。当允许需求变更时，在特定的版本中加入每一项变更，并在那个版本计划中作出需要的变更。</p></li><li><p>为需求建立模型，需求的图形分析模型是软件需求规格说明极好的补充说明。它们能提供不同的信息与关系以有助于找到不正确的、不一致的、遗漏的和冗余的需求。这样的模型包括数据流图、实体关系图、状态变换图、对话框图、对象类及交互作用图。</p></li><li><p>创建数据字典，数据字典是对系统用到的所有数据项和结构的定义，以确保开发人员使用统一的数据定义。在需求阶段，数据字典至少应定义客户数据项以确保客户与开发小组是使用一致的定义和术语。分析和设计工具通常包括数据字典组件。</p></li><li><p>使用质量功能调配，（QFD）是一种高级系统技术，它将产品特性、属性与对客户的重要性联系起来。该技术提供了一种分析方法以明确那些是客户最为关注的特性。QFD将需求分为三类：期望需求，即客户或许并未提及，但如若缺少会让他们感到不满意；普通需求；兴奋需求，即实现了会给客户带去惊喜，但若未实现也不会受到责备（Zultner 1993;Pardee 1996）。</p></li></ol><p>记住一点，不要试图在你的项目中把这些方法都用上去，四个现代化并不是一夜就可以实现的。同样，尝试着使用你认为对你很有帮助的方法，确实收到效果之后，在考虑继续学习方法。因为上面提到的都是需求分析的大方法，事实上还有很多很多的方法可以采用，例如，采用SRS模板、指明需求的来源、为每项需求注上标号、记录业务规范、创建需求跟踪能力矩阵、审查需求文档、以需求为依据编写测试用例、编写用户手册、确定合格的标准。</p><h2 id="业务建模" tabindex="-1"><a class="header-anchor" href="#业务建模" aria-hidden="true">#</a> 业务建模</h2><p>很多人都没有意识到业务需求阶段应该做些什么事情，实际上业务建模是最重要的一件事情。不要觉得业务建模这个词很深奥，让人模不着头脑。其实所有做过需求分析的人都做过业务建模，比如你了解企业的运作模式就是一种你脑海中的业务建模。但是大多数人都没有科学的、系统的、文档化的做过业务建模。</p><p>业务建模的目的在于：</p><p>了解目标组织（将要在其中部署系统的组织）的结构及机制。<br> 了解目标组织中当前存在的问题并确定改进的可能性。<br> 确保客户、最终用户和开发人员就目标组织达成共识。<br> 导出支持目标组织所需的业务需求。</p><p>上面的话是不是很抽象呢，其实没有什么复杂的：人和电脑是完全不同的思想（思维方式）。所以，原先适合人的业务流程对于计算机来说可不一定合适的，为了最大限度的利用计算机，必须要了解原先的业务流程并对此加易改造（流程自动化），当然这些动作需要得到用户的许可。有些人认为说只有ERP这种大系统才需要对业务流程进行重组，但是实际上，不论是部门级的MIS系统，还是社会级的电子商务系统，都需要对业务流程进行改造，所不同的只是改造的程度。</p><p>业务建模很重要的一点是在分析企业流程的同时分析出基础企业对象（Common Business Object）（这个词我翻译的不好，如果大家有更好的翻译，请告诉我）。任何企业都有最基础的一些元素，例如银行的CBO就有帐户，制造业的CBO就有订单等。有一次我的一个在企业应用方面研究多年的朋友告诉我一个秘诀，他说，企业的CBO无非是4个：客户、员工、产品和供应商（银行的供应商应该称为同业）。其他的所有CBO都是在这四个CBO的基础上发展起来的。比如说CBO中客户和产品是多对多的关系，根据关系数据的理论，任何多对多的关系都可以拆分成多个一对多或一对一的关系。你就可以在这两个类之间引入订单类，客户和订单之间是一对多，订单和产品之间又是一对多，这样一个多对多的关系就拆分成两个一对多的关系，而新的订单类也就顺理成章的产生了。在订单类产生时，你可能还会加入一个关联类：业务员类。而业务员类又是从员工类继承下来的。所以呢，企业的四种CBO通过不同的组合，不同的关系，能够形成企业运作的许许多多的CBO。</p><p>CBO是做业务建模的基础，在此基础上，通过评估业务状态，说明当前业务，确定业务流程，改进业务流程的定义，设计业务流程实现，改进角色和职责，研究流程自动化，开发领域模型等一系列在RUP中定义的工作流程实现业务建模的目标。</p><h2 id="需求获取" tabindex="-1"><a class="header-anchor" href="#需求获取" aria-hidden="true">#</a> 需求获取</h2><p>需求获取(requirement elicitation)是需求工程的主体。对于所建议的软件产品，获取需求是一个确定和理解不同用户类的需要和限制的过程。获取用户需求位于软件需求三个层次的中间一层。业务需求决定用户需求，它描述了用户利用系统需要完成的任务。从这些任务中，分析者能获得用于描述系统活动的特定的软件功能需求，这些系统活动有助于用户执行他们的任务。 需求获取是在问题及其最终解决方案之间架设桥梁的第一步。获取需求的一个必不可少的结果是对项目中描述的客户需求的普遍理解。一旦理解了需求，分析者、开发者和客户就能探索出描述这些需求的多种解决方案。参与需求获取者只有在他们理解了问题之后才能开始设计系统，否则，对需求定义的任何改进，设计上都必须大量的返工。把需求获取集中在用户任务上—而不是集中在用户接口上—有助于防止开发组由于草率处理设计问题而造成的失误。 需求获取、分析、编写需求规格说明和验证并不遵循线性的顺序，这些活动是相互隔开、增量和反复的。当你和客户合作时，你就将会问一些问题，并且取得他们所提供的信息（需求获取）。同时，你将处理这些信息以理解它们，并把它们分成不同的类别，还要把客户需求同可能的软件需求相联系（分析）。然后，你可以使客户信息结构化，并编写成文档和示意图（说明）。下一步，就可以让客户代表评审文档并纠正存在的错误（验证）。这四个过程贯穿着需求分析的整个阶段。 需求获取可能是软件开发中最困难、最关键、最易出错及最需要交流的方面。需求获取只有通过有效的客户—开发者的合作才能成功。分析者必须建立一个对问题进行彻底探讨的环境，而这些问题与产品有关。为了方便清晰地进行交流，就要列出重要的小组，而不是假想所有的参与者都持有相同的看法。对需求问题的全面考察需要一种技术，利用这种技术不但考虑了问题的功能需求方面，还可讨论项目的非功能需求。确定用户已经理解：对于某些功能的讨论并不意味着即将在产品中实现它。对于想到的需求必须集中处理并设定优先级，以避免一个不能带来任何益处的无限大的项目。 需求获取是一个需要高度合作的活动，而并不是客户所说的需求的简单誊本。作为一个分析者，你必须透过客户所提出的表面需求理解他们的真正需求。询问一个可扩充（open-ended）的问题有助于你更好地理解用户目前的业务过程并且知道新系统如何帮助或改进他们的工作。调查用户任务可能遇到的变更，或者用户需要使用系统其它可能的方式。想像你自己在学习用户的工作，你需要完成什么任务？你有什么问题？从这一角度来指导需求的开发和利用。</p><p>还有，探讨例外的情况：什么会妨碍用户顺利完成任务？对系统错误情况的反映，用户是如何想的？询问问题时，以“还有什么能” ,”当?时，将会发生什么”“你有没有曾经想过” ,“有没有人曾经”为开头。记下每一个需求的来源，这样向下跟踪直到发现特定的客户。</p><p>有些时候，尝试着问一些“愚蠢”的问题也有助于客户打开话匣子。如果你直接要求客户写出业务是如何实现的，客户十有八九无法完成。但是如果你尝试着问一些实际的问题，例如：“以我的理解，你们收到订单后，会...”。客户立刻就会指出你的错误，并滔滔不绝的开始谈论业务，而你，就在一边仔细的聆听吧。这一招就叫做“抛砖引玉”。</p><p>需求讨论会上必须要使用笔记本电脑，还要指定一个打字熟练的人把所有的讨论记录下来，记录的同时还要做一定的整理。如果不这样做，那么你结束会议的时候就会发现，所有的讨论只剩下一个模糊的印象，需求对你来说仍然是一件遥远的事情。在座谈讨论之后，记下所讨论的条目(item)，并请参与讨论的用户评论并更正。及早并经常进行座谈讨论是需求获取成功的一个关键途径，因为只有提供需求的人才能确定是否真正获取需求。进行深入收集和分析以消除任何冲突或不一致性。</p><p>尽量把客户所持的假设解释清楚，特别是那些发生冲突的部分。从字里行间去理解以明确客户没有表达清楚但又想加入的特性或特征。Gause 和Weinberg（1989）提出使用“上下文无关问题”—这是一个高层次的问题，它可以获取业务问题和可能的解决方案的全部信息。客户对这些问题的回答诸如“产品要求怎样的精确度”或“你能帮我解释一下你为什么不同意某人的回答吗？”这些回答可以更直接地认识问题，而这是封闭（close-end）问题所不能做到的。</p><p>需求获取利用了所有可用的信息来源，这些信息描述了问题域或在软件解决方案中合理的特性。一个研究表明：比起不成功的项目，一个成功的项目在开发者和客户之间采用了更多的交流方式（Kiel and Carmel 1995）。与单个客户或潜在的用户组一起座谈，对于业务软件包或信息管理系统（MIS）的应用来说是一种传统的需求来源。直接聘请用户进行获取需求的过程是为项目获得支持和买入（buy-in）的一种方式。</p><p>尽量理解用户用于表述他们需求的思维过程。充分研究用户执行任务时作出决策的过程，并提取出潜在的逻辑关系。流程图和决策树是描述这些逻辑决策途径的好方法。</p><p>在需求获取的过程中，你可能会发现对项目范围的定义存在误差，不是太大就是太小。如果范围太大，你将要收集比真正需要更多的需求，以传递足够的业务和客户的值，此时获取过程将会拖延。如果项目范围太小，那么客户将会提出很重要的但又在当前产品范围之外的需求。当前的范围太小，以致不能提供一个令人满意的产品。需求的获取将导致修改项目的范围和任务，但作出这样具有深远影响的改变，一定要小心谨慎。 正如经常所说的，需求主要是关于系统做什么，而解决方案如何实现是属于设计的范围。这样说虽然很简洁，但似乎过于简单化。需求的获取应该把重点放在“做什么”上，但在分析和设计之间还是存在一定的距离。你可以使用假设“怎么做”来分类并改善你对用户需求的理解。在需求的获取过程中，分析模型、屏幕图形和原型可以使概念表达得更加清楚，然后提供一个寻找错误和遗漏的办法。把你在需求开发阶段所形成的模型和屏幕效果看成是方便高效交流的概念性建议，而不应该看成是对设计者选择的一种限制。 需求获取讨论会中如果参与者过多，就会减慢进度。人数大致控制在5到7人是最好的。这些人包括客户、系统设计者、开发者和可视化设计者等主要工程角色。相反地，从极少的代表那里收集信息或者只听到呼声最高、最有舆论影响的用户的声音，也会造成问题。这将导致忽视特定用户类的重要的需求，或者其需求不能代表绝大多数用户的需要。最好的权衡在于选择一些授权为他们的用户类发言的产品代表者，他们也被同组用户类的其它代表所支持。 没有一个简单、清楚的信号暗示你什么时候已完成需求获取。当客户和开发者与他们的同事聊天、阅读工业和商业上的文献及在早上沐浴时思考时，他们都将对潜在产品产生新的构思。你不可能全面收集需求，但是下列的提示将会暗示你在需求获取的过程中的返回点。</p><ol><li>如果用户不能想出更多的使用实例，也许你就完成了收集需求的工作。用户总是按其重要性的顺序来确定使用实例的。</li><li>如果用户提出新的使用实例，但你可以从其它使用实例的相关功能需求中获得这些新的使用实例，这时也许你就完成了收集需求的工作。这些新的使用实例可能是你已获取的其它使用实例的可选过程。</li><li>如果用户开始重复原先讨论过的问题，此时，也许你就完成了收集需求的工作。</li><li>如果所提出的新需求比你已确定的需求的优先级都低时，也许你就完成了收集需求的工作。</li><li>如果用户提出对将来产品的要求，而不是现在我们讨论的特定产品，也许你就完成了收集需求的工作。</li></ol><p>以上知识大致上讨论需求分析应该如何做，实际上对于需求分析的方法有很多很多，已经形成了一定的理论，当然这种理论比较偏向与方法学，而方法学的应用主要还是要靠个人。所以，大家在实际应用的时候，不妨结合自己的实际，有选择性的采用一些方法，那你就是成功的。</p><h2 id="用例在需求分析中的使用" tabindex="-1"><a class="header-anchor" href="#用例在需求分析中的使用" aria-hidden="true">#</a> 用例在需求分析中的使用</h2><p>多年来，分析者总是利用情节或经历来描述用户和软件系统的交互方式，从而获取需求（McGraw and Harbison 1997）。Ivar Jacobson（1992）把这种看法系统地阐述成用例（用例）的方法进行需求获取和建模。虽然用例来源于面向对象的开发环境，但是它也能应用在具有许多开发方法的项目中，因为用户并不关心你是怎样开发你的软件。而最重要的，用例的观点和思维过程带给需求开发的改变比起是否画正式的用例图显得更为重要。注意用户要利用系统做什么远远强于询问用户希望系统为他们做什么这一传统方法。 用例的重要功能是用画用例图的功能来鉴别和划分系统功能。它把系统分成角色（actor）和用例（用例）。角色(actor)表示系统用户能扮演的角色（role）。这些用户可能是人，可能是其他的计算机一些硬件或者甚至是其它软件系统，唯一的标准是它们必须要在被划分进用例的系统部分以外。它们必须能刺激系统部分并接收返回。用例描述了当角色给系统特定的刺激时系统的活动。这些活动被文本描述。它描述了触发用例的刺激的本质，输入和输出到其他活动者，和转换输入到输出的活动。用例文本通常也描述每一个活动在特殊的活动线时可能的错误和系统应采取的补救措施。 这样说可能会非常复杂，其实一个用例描述了系统和一个角色（actor）的交互顺序。用例被定义成系统执行的一系列动作，动作执行的结果能被指定角色察觉到。用例可以:</p><p>用例捕获某些用户可见的需求，实现一个具体的用户目标。<br> 用例由角色激活，并提供确切的值给角色。</p><p>用例可大可小，但它必须是对一个具体的用户目标实现的完整描述。在UML中，用例表示为一个椭圆。</p><p>角色是指用户在系统中所扮演的角色。其图形化的表示是一个小人。在某些组织中很可能有许多角色实例（例如有很多个销售员），但就该系统而言，他们均起着同一种作用，扮演着相同的角色，所以用一个角色表示。一个用户也可以扮演多种角色。例如，一个高级营销人员既可以是贸易经理，也可以是普通的营销人员；一个营销人员也可以是售货员。在处理角色时，应考虑其作用，而不是人或工作名称，这一点是很重要的。</p><p>我们使用不带箭头的线段将角色与用例连接到一起，表示两者之间交换信息，称之为通信联系。角色触发用例，并与用例进行信息交换。单个角色可与多个用例联系；反过来，一个用例可与多个角色联系。对同一个用例而言，不同角色有着不同的作用：他们可以从用例中取值，也可以参与到用例中。需要注意的是角色在用例图中是用类似人的图形来表示，尽管执行的，但角色未必是人。例如，角色也可以是一个外界系统，该外界系统可能需要从当前系统中获取信息，与当前系统有进行交互。</p><p>一个用例可能包括完成某项任务的许多逻辑相关任务和交互顺序。因此，一个用例是相关的用法说明的集合，并且一个说明（scenario）是用例的实例。这种关系就像是类和对象的关系。在用例中，一个说明被视为事件的普通过程(normal course)，也叫作主过程，基本过程，普通流，或“满意之路” (happy path)。在描述普通过程时列出执行者和系统之间相互交互或对话的顺序。当这种交互结束时，执行者也达到了预期的目的。</p><p>在用例中的其它说明可以描述为可选过程(alternative coruse)。可选过程也可促进成功地完成任务，但它们代表了任务的细节或用于完成任务的途径的变化部分。在交互序列中，普通过程可以在一些决策点上分解成可选过程，然后再重新汇成一个普通过程。</p><h2 id="角色类和角色实例" tabindex="-1"><a class="header-anchor" href="#角色类和角色实例" aria-hidden="true">#</a> 角色类和角色实例</h2><p>软件产品最终是给一些用户来使用的，而用户之间的差异是非常大的。造成差异的原因包括了对计算机的认知程度的不同，使用习惯的不同，在软件目标组织中所处的地位不同，地理位置不同，业务熟练程度不同。</p><p>不同的用户都有自己一系列的功能需求和非功能需求。对电脑熟练程度不同的人可能就会有不同的要求，熟练程度低的用户可能希望有一个友好的界面，熟练程度高的用户可能更希望有快捷键或宏的操作以提高工作效率。考虑到用户的差异性，将用户分类并研究用户类的行为特征是非常有必要的。所以在做具体的需求之前，先将用户分局行为和特点进行分类，对于研究、收集用户的需求是非常有帮助的。</p><p>可以利用一个简单的表格列出一些原始的分类，然后不断的完善这个表格。确认你的分类之间没有交集。并充分描述用户分类的行为，目的，要求等。在企业分析中，比较常见的分类可能包括，供应商，客户，部门等。</p><p>就像C++中的类和对象一样，我们把分析出的用户分类称为“角色类”，把实际的用户称为“角色实例”。在得到用户分类之后，最重要的就是要选出用户代表，用户代表不仅仅是在需求阶段中参与项目，还必须对项目的全过程负责。用户代表能够代表用户分类的需求。抓住用户代表的需求就大致把握住了用户类的需求。当然，需求分析还是需要在用户中做大规模的调查的，只是要把重点放在用户代表上。</p><p>确保和用户直接进行沟通！大家有没有玩过传话的游戏，可能看过。一群人排成一列，一句话从排头挨个向后传，到最后，那句话已经是面目全非了。所以，一定要保证项目组能够直接和用户接触。 对于和用户直接沟通这一点，一般的针对特定企业的应用系统当然是不成问题，可是如果是开发行业软件，和用户直接沟通就成为一件几乎是不可能的事情。在这种情况下，一般有几种解决的办法：</p><p>做大规模的市场调查，针对你的目标市场做市场调查，并根据统计学的理论建立你的数学模型。这部分的工作效果最好，其性质有些象一些游戏公司会发布一些Demo版的游戏。可是对于一般的企业来说，这项工作费时费力，高昂的成本往往使大家知难而退。我的意见是，方法是非常好的，但是可以采用折衷的办法，例如选取有代表性的企业，为特定企业制作一个较小的版本并收集反馈意见等。这涉及到很多市场营销的内容，并不是我的专业所长，这里就不多弄斧了。 聘请行业专家，一个行业专家往往可以在项目需求方面发挥极为重要的作用。一个行业专家往往都有大量的行业经验和行业的人际关系网络。在产品的设计方面，这个行业专家提供很多宝贵的意见。在目前很多的软件的开发过程中都采用了这种方式。行业专家有两种：一种是在这个行业中有很深的资历，但是对软件技术并不熟悉；第二种是开发过同类软件的软件专家，这种人在开发同类软件过程中已经积累了大量的项目经验，并且具有软件开发的知识。这种方式是获取需求的最好的方式。 分析对比同类软件，微软在开发Office、Visual Studio的时候，也是参照了Lotus和Borland的成熟产品。这种方式的特点在于成本很低，比较适合和其他的方式配合使用。但是，要注意自己有没有触犯专利法。</p><h2 id="需求的冲突" tabindex="-1"><a class="header-anchor" href="#需求的冲突" aria-hidden="true">#</a> 需求的冲突</h2><p>有的时候，虽然已经将用户分类并选出了用户代表。但是需求的来源众多，往往会发生需求之间自相矛盾的事情。需求从四面八方收集来后，人们难以解决冲突，澄清模糊之处以及协调不一致之处。某些人还要对不可避免要发生的范围问题单独作出决定。在项目的早期阶段，你必须决定谁是需求问题的决策者。如果不清楚谁有权并且有责任来作出决策，或者授权的个人不愿意或不能作出决策，那么决策者的角色将自然而然地落在开发者身上。这是一个非常糟糕的选择，因为开发者通常没有足够多的信息和观点来作出业务上的决策。</p><p>在软件项目中，谁将对需求作出决策的问题并没有统一的正确答案。分析员有时听从呼声高的或来自最高层人物的最大的需求。即便使用用户代表这一手段，必须解决来自不同用户类的相冲突的需求。通常，应尽可能由处于公司底层的人作出决策，因为他们与问题密切相关，并能得到关于这些问题的广泛信息。</p><p>如果不同的用户类有不一致的需求，那么必须决策出满足哪一类用户的需求更为重要。了解可能使用产品的客户种类的信息和他们的用法与产品的业务目标的关系如何，将有助于你决定哪一个用户类所占份额最大。</p><p>当开发者想象中的产品与客户需求冲突时，通常应该由客户作出决策。然而，不要陷到“客户总是对的”的陷阱中去，对他们百依百顺。现实中，客户并不总是对的。客户总是持有自己的观点，开发者必须理解并尊重这一观点。</p><h2 id="用例" tabindex="-1"><a class="header-anchor" href="#用例" aria-hidden="true">#</a> 用例</h2><p>在具体的需求过程中，有大的用例（业务用例），也有小的用例。主要是由于用例的范围决定的。用例像是一个黑盒，它没有包括任何和实现有关或是内部的一些信息。它很容易就被用户（也包括开发者）所理解（简单的谓词短语）。如果用例不足以表达足够的信息来支持系统的开发，就有必要把用例黑盒打开，审视其内部的结构，找出黑盒内部的Actor和用例。就这样通过不断的打开黑盒，分析黑盒，再打开新的黑盒。直到整个系统可以被清晰的了解为止。</p><p>为什么要采用这种分析方法呢？计算机系统除了在与外界系统、人员有一系列的交互，在系统内部也往往存在着复杂的交互。因此，在系统建模时，除了描述系统与外界的交互，同时还要描述系统内部的交互。传统的MIS系统中，系统与外界的交互较多。典型的，如ATM取款机：存在着大量的用户与ATM，ATM与其它系统的交互。而电信领域的系统，与外界的交互较少。例如，系统的输入可能仅仅是从交换机上采集信息，然后由系统进行处理。系统的复杂逻辑包含在系统内部处理的流程上，而非与外部系统的交互。建模主要任务是表达系统内部的交互。</p><p>用例图适于表达交互，之所以上面使用了电信系统，是因为用例最早来自于Ericsson的交换机系统。当时，还是Ericsson雇员的Jacobson初步建立了用例图的概念，并于1994年提出了OOSE方法，其最大特点是面向用例（Use-Case），并在用例的描述中引入了外部角色的概念。用例的概念是精确描述需求的重要武器，比较适合支持商业工程和需求分析。随着用例的发展，用例被大量的 用于对功能进行描述。每个用例代表了系统与外部ACTOR的交互。可以采取顺序图来表达用例的具体操作程序。ACTOR用于确定系统的边界。</p><p>ACTOR、用例可以从不同的层次来描述信息。采用该原则的原因有：</p><ol><li>需求并不是在项目一开始就很明确，往往是随着项目的推进，逐渐细化。</li><li>人的认知往往具有层次的特性。从粗到细、从一般到特殊。采用不同的层次来描述，适于认知的过程。 使用用例开发系统的一般过程</li></ol><p>在开发过程的初始阶段，可以根据具体的项目特点，制订开发各个视图之间的关联原则，指导规范。在开发的过程中，视图的组织原则应不断进行维护、更新。</p><p>识别ACTOR来识别系统与外界交互的实体。ACTOR具有特定领域的特征，例如：交换机（采集系统）、97信息系统等。在系统层次的ACTOR确定了系统的边界。</p><p>识别用例。同ACTOR一样，用例具有不同层次。对较为概括的USECASE，需要细化。注：系统开发需要一定的规则来确定，如何来分解用例；可能基于原有系统的经验，或是参考现有资料。</p><p>当用例细化到可以被理解的层次。需要基于用例进行下一步的开发。如前面提到的，用例主要用来描述交互。因此，存在交互的实体和交互的细节。交互的实体采用类图来描述；而交互的细节，采用顺序图来描述。</p><p>当系统复杂到一定层次时，类图和顺序图可能不能足以描述其复杂程度。在该情况下，需要使用状态图来辅助阐述。状态图和顺序图之间使用事件联结在一起。它们之间的一致性问题，目前UML和ROSE没有提供解决方案。相对折衷的方法是使用事件的命名规范强制一致性。</p><p>可以说，之前说的所有的东西都是为了能够导出用例在需求中的作用。用例是从用户的角度看待系统，而不是基于程序员的角度。这样的话，用例驱动的系统能够真正做到以用户为中心，用户的任何需求都能够在系统开发链中完整的体现。用户和程序员间通过用例沟通，避免了牛头马嘴的尴尬局面。 从前，系统开发者总是通过情节来获取需求，是问用户希望系统为他做什么。在Jacobson发明了用例的概念之后，需求获取就变成问用户要利用系统做什么。这是立场不同导致的结果。用户通常并不关心系统是如何实现的（也有少数可爱的技术狂是例外）。对他们来说，更重要的是要达到他的目的。相反的，大部分的程序员的工作习惯就是考虑计算机应该如何实现用户的要求。所幸的是，用例方法能够调和双方的矛盾，因为虽然用例是来源于用户，服务于用户，但是它同样可以用于开发的流程。当系统的开发过程都是基于用例的，用用例获取需求，用用例设计，用用例编码，用用例测试的时候。这个开发过程就是用例驱动的。 用例和用例文档</p><p>《软件需求》一书中提到了几种方法来确定用例：</p><p>首先明确执行者和他们的角色，然后确定业务过程，在这一过程中每一个参与者都在为确定用例而努力。</p><p>确定系统所能反映的外部事件，然后把这些事件与参与的执行者和特定的用例联系起来。</p><p>以特定的说明形式表达业务过程或日常行为，从这些说明中获得用例，并确定参与到用例中的执行者，有可能从现在的功能需求说明中获得用例。如果有些需求与用例不一致，就应考虑是否真的需要它们。</p><p>用例代表了用户的需求，在你的系统中，应该直接从不同用户类的代表或至少应从代理那里收集需求。用例为表达用户需求提供了一种方法，而这一方法必须与系统的业务需求相一致。分析者和用户必须检查每一个用例，在把它们纳入需求之前决定其是否在项目所定义的范围内。基于“用例”方法进行需求获取的目的在于：描述用户需要使用系统完成的所有任务。在理论上，用例的结果集将包括所有合理的系统功能。在现实中，你不可能获得完全包容，但是比起我所知道的其它获取方法，基于用例的方法可以为你带来更好的效果。 当使用用例进行需求获取时，应避免受不成熟的细节的影响。在对切合的客户任务取得共识之前，用户能很容易地在一个报表或对话框中列出每一项的精确设计。如果这些细节都作为需求记录下来，他们会给随后的设计过程带来不必要的限制。你可能要周期性地检查需求获取，以确保用户参与者将注意力集中在与今天所讨论的话题适合的抽象层上。向他们保证在开发过程中，将会详尽阐述他们的需求。在一个逐次详细描述过程中，重复地详述需求，以确定用户目标和任务，并作为用例。然后，把任务描述成功能需求，这些功能需求可以使用户完成其任务，也可以把它们描述成非功能需求，这些非功能需求描述了系统的限制和用户对质量的期望。虽然最初的屏幕构思有助于描述你对需求的理解，但是你必须细化用户界面设计。 建立用例文档。在每一次的需求获取之后，都会生成很多未整理的需求，你必须将它们组织成用例文档。使用诸如模板的技术能够提高你的速度和需求的复用性。一个用例文档可以使用表格来组织，主要的要素包括了用例标识号、用例名称、父用例标志号、创建者、创建时间、审核者、修订记录、角色、说明、先决条件、请求结果、优先级、普通过程、可选过程、例外、非功能需求、假设、注释和问题。 虽然列举出了这么多的属性，但是实际中使用的属性这要看你的团体而定，看项目的大小而定。把大量的时间花在用例的描述上是没有意义的。用户需要的是一个软件系统，并不是一大堆的用例说明。</p>',62),n=[l];function o(d,h){return e(),a("div",null,n)}const c=p(r,[["render",o],["__file","reqmng13.html.vue"]]);export{c as default};