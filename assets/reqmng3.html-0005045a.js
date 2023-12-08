import{_ as l,o as i,c as t,a as e}from"./app-f0851ed3.js";const p={},a=e('<h1 id="在需求采集时-如何对客户的需求进行分类" tabindex="-1"><a class="header-anchor" href="#在需求采集时-如何对客户的需求进行分类" aria-hidden="true">#</a> 在需求采集时，如何对客户的需求进行分类</h1><p>不要指望你的客户会给需求分析者提供一个简洁、完整、组织良好的需求清单。分析者必须把代表客户需求的许多信息分成不同的类型，这样他们就能合理地编写信息文档并把它们用于最合理的方式上。那些不属于这些类型的信息可能代表一个非软件项目的需求，例如，为使用新系统而进行的用户培训或者它仅仅是不重要的信息。</p><p>下面讨论在听取客户需求过程中的一些建议，这将有助于对信息进行分类处理。</p><ol><li><p>业务需求，描述客户或开发公司可以从产品中得到的资金、市场或其它业务利润的需求就是最可能的业务需求。再听听直接或间接的软件用户得到好处，例如“市场股票价格上升x %”，“每年节约$ Y”，或“替代了维护费用高的老一代系统Z”。</p></li><li><p>使用实例或说明有关利用系统执行的业务任务或达到用户目标的总的陈述可能就是使用实例，而特定的任务描述表示了用法说明。与客户一起商讨，把特定的任务概括成更广泛的使用实例。可以通过让客户描述他们的业务工作流活动来获取使用实例。</p></li><li><p>业务规则，当一个客户说，一些活动只能在特定的条件下，由一些特定的人来完成时，该用户可能在描述一个业务规则，例如，“如果一个药剂师在危险化学制品培训方面是可靠的，那么他就可以在一级危险药品清单上订购化学制品”。业务规则是有关业务过程的操作原则。你可以用一些软件功能需求来加强规则，例如，让“化学制品跟踪系统”可以访问培训记录数据库。正如上面所说的那样，这里业务规则不是功能需求。</p></li><li><p>功能需求，客户所说的诸如“用户应该能&lt;执行某些功能&gt;”或者“系统应该&lt;具备某些行为〉”，这是最可能的功能需求。功能需求描述了系统所展示的可观察的行为，并且大多数是处于执行者—系统响应顺序的环境中。功能需求定义了系统应该做什么，它们组成了软件需求规格说明的一部分。分析者应该明确，每个人应理解系统为什么“必须”执行某一功能。所提出的功能需求有时反映了过时的或无效的业务过程，而这些过程不能加入到新系统中。</p></li><li><p>质量属性，对系统如何能很好地执行某些行为或让用户采取某一措施的陈述就是质量属性，这是一种非功能需求。听取那些描述合理特性的意见：快捷、简易、直觉性、用户友外部接口需求好、健壮性、可靠性、安全性和高效性。你将要和用户一起商讨精确定义他们模糊的和主观言辞的真正含义。</p></li><li><p>外部接口需求，这类需求描述了系统与外部的联系。软件需求规格说明必须包括用户接口和通信机制、硬件和其它软件系统需求部分。客户描述外部接口需求包括如下习惯用语：</p><ul><li>“从&lt;某些设备〉读取信号”</li><li>“给&lt;一些其它系统&gt;发送消息”</li><li>“以&lt;某种格式&gt;读取文件”</li><li>“能控制&lt;一些硬件&gt;”</li></ul></li><li><p>限制，限制是指一些合理限制设计者和程序员选择的条件。它们代表了另一种类型的非功能需求，你必须把这些需求写入软件需求规格说明。尽量防止客户施加不必要的限制，因为这将妨碍提出一个好的解决方案。不必要的限制将会降低利用现有商业化软件集成解决方案的能力。一定的限制有助于提高产品质量属性。只利用程序语言的标准命令而不允许使用供应商的扩展，可以提高可移植性。下面是客户描述限制的一些习惯用语：</p><ul><li>“必须使用&lt;一个特定的数据库产品或语言&gt;”</li><li>“不能申请多于&lt;一定数量的内存&gt;”</li><li>“操作必须与&lt;其它系统&gt;相同”</li><li>“必须与&lt;其它应用程序&gt;一致”</li></ul></li><li><p>数据定义，当客户描述一个数据项或一个复杂的业务数据结构的格式、允许值或缺省值时，他们正在进行数据定义。例如，“邮政编码由5个数字组成，后跟一个可选的短划线或一个可选的四位数字，缺省为0 0 0 0”就是一个数据定义。把这些集中在一个数据字典中，作为项目的参与者在整个项目的开发和维护中的主要参考文档。</p></li><li><p>解决思想，如果一个客户描述了用户与系统交互的特定方法，以使系统产生一系列活动（例如：用户从下载清单中选择一个所需要的项），这时你正在听取建议性的解决方案，而不是需求。所建议的解决方案使获取需求小组成员在潜在的真正需求上分散精力。在获取需求时，应该把重点放在需要作什么而不是新系统应该如何设计和构造。探讨客户为什么提出一个特定的实现方法，因为这可以帮助你理解真正的需求和用户对如何构造系统的隐含的期望。</p></li></ol>',4),c=[a];function o(r,n){return i(),t("div",null,c)}const _=l(p,[["render",o],["__file","reqmng3.html.vue"]]);export{_ as default};