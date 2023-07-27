(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{430:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"初探c-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#初探c-3"}},[s._v("#")]),s._v(" 初探c#-3")]),s._v(" "),t("p",[s._v("最近很忙，抽空写了这篇。见谅！王先生该不会又是第一个吧！哈哈")]),s._v(" "),t("h2",{attrs:{id:"_1。3-类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1。3-类型"}},[s._v("#")]),s._v(" 1。3 类型")]),s._v(" "),t("p",[s._v("c#支持两种基本的类型：一种是值（value types），一种是引用（reference types）。")]),s._v(" "),t("p",[s._v("值包括简单类型（char、int、和float），枚举（enum）和结构（struct）。")]),s._v(" "),t("p",[s._v("引用包括类（class），界面（interface），代表（delegate）和数组阵列（array）。")]),s._v(" "),t("p",[s._v("值与引用不同之处在于：值直接存储它的数据内容；而引用存储对象的引用。是不是粉费解？！打个比方吧。你在某地买了套别墅（好棒噢）。却从未去过，只知道地址，怎么办？你可以坐出租车，司机看了地址就知道怎样走不用你操心。你手里的地址就好像对象的名字，你把它写在程序中，就好像把地址给了司机。司机就是你的编译器，它知道该去哪。你豪华的房子就好比那个NGWS SDK开发包（82mb噢，够豪华了！俺的m啊--就这样烧喽）。房子里有你想要的东东，比如你想写一句话（i dont like Hello world），就好像上面例子，要用到“WriteLine”。于是，你就给出“WriteLine”的地址，比如：“Console.WriteLine”。明白？！俺可累了。zzz...  （强打精神）不知道你想到没有，值和引用的区别可以引出一个重要特性。值的变量和变量存储的数据是一一对应的，唯一性。而引用则不然。引用中不同的变量可以引用同一个对象的实例。当其中一个变量改变实例的值时，其他引用这个实例的变量也会受到影响（当然，变量本身并没有改变，即，地址没变）。瞧，变量只是说明存储对象的位置（地址），而不是对象本身。就好像你漂亮的房子被烧了，但你的地址并没有改变，但地址对应的房子就没了。也许是别人也有这个地址，他去烧了你的房子！")]),s._v(" "),t("p",[s._v("好了，在给个例子：")]),s._v(" "),t("div",{staticClass:"language-csharp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-csharp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("using")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CValue")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")])]),s._v(" Value "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Test")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token return-type class-name"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")])]),s._v(" val1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")])]),s._v(" val2 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" val1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" val2 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CValue")]),s._v(" ref1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constructor-invocation class-name"}},[s._v("CValue")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CValue")]),s._v(" ref2 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" ref1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ref2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Value "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("15")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("WriteLine")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Values: {0}, {1}"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" val1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" val2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("WriteLine")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Refs: {0}, {1}"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ref1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ref2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" \n")])])]),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("下面是输出的结果： \nValues: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(", "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),s._v(" \nRefs: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),s._v(", "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),s._v(" \n")])])]),t("p",[s._v("啊哈，应该粉清楚了吧。变量"),t("code",[s._v("val1")]),s._v("和变量"),t("code",[s._v("val2")]),s._v("互不影响,它们各自有自己的存储空间。而"),t("code",[s._v("ref2")]),s._v("复制了"),t("code",[s._v("ref1")]),s._v("，所以，它们引用了同一个对象的实例。当改变它们其中一个的时候，就会影响到另一个的值。")]),s._v(" "),t("hr"),s._v(" "),t("p",[s._v("作者： Burn[5151599] 2000-10-25 10:10:49  [回复]")]),s._v(" "),t("blockquote",[t("p",[s._v("呵呵，这回我是第一个了，哈哈，好高兴呀！\n我支持你，兄弟，继续写呀！！！")]),s._v(" "),t("p",[s._v("我是个盖世英雄，有一天我会驾着七彩降云杀入敌营去救我的情人，我猜对了前头\n也猜对了这结果。（Zzzz....)")])])])}),[],!1,null,null,null);t.default=e.exports}}]);