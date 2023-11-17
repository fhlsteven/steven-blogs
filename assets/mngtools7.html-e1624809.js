import{_ as e,o as r,c as a,a as t}from"./app-a2b6e588.js";const c={},h=t('<h1 id="microsoft-project中的成本管理" tabindex="-1"><a class="header-anchor" href="#microsoft-project中的成本管理" aria-hidden="true">#</a> Microsoft Project中的成本管理</h1><p>本文从项目成本的估计、计算和跟踪三个方面介绍Microsoft Project中的成本管理。</p><h2 id="_1-估计项目总成本" tabindex="-1"><a class="header-anchor" href="#_1-估计项目总成本" aria-hidden="true">#</a> 1. 估计项目总成本</h2><p>在Project中可以使用下列三种方法之一来估计项目总成本：</p><p>自下而上的估计：输入资源的基准费率或每次使用成本以及各项任务的固定成本，然后让Project计算出资源、任务和整个项目的总成本。这种方法也称为自下而上的估计，能得出准确而可靠的结果。</p><p>自上而下的估计：根据以往的经验和过去类似的项目，输入资源、任务和项目的总体成本。这种方法（称为自上而下的估计）易于完成，但通常准确性不如自下而上的估计方法。</p><p>参数建模方法：使用参数建模方法，即基于数学模型中的项目特征（参数）来预测成本。模型既可以简单（例如，使用每平方米的成本来估计住宅建造的总成本）也可以复杂（例如，使用多个因素估计住宅建造的总成本，如楼层、窗户和门的数量）。对于复杂的参数模型，可以使用 Microsoft Excel进行计算，然后将成本估计导入到 Project 中。而对于使用简单公式（例如计算每平方米成本的公式）的模型，则可以使用 Project 的公式功能。</p><h2 id="_2-计算项目成本" tabindex="-1"><a class="header-anchor" href="#_2-计算项目成本" aria-hidden="true">#</a> 2. 计算项目成本</h2><p>使用 Project您可以评估并跟踪项目的基本成本信息。可以使用几种不同类型的成本，而 Project 可以在项目进行过程中为您计算这些成本。</p><p>Project 允许使用的成本<br> 由于成本是项目日程排定和控制的一个重要方面，Project 提供了几种不同类型的成本。使用 Project，您可以输入和跟踪以下类型的成本：<br> 基于费率的成本 ：根据为资源指定的费率和已完成工时量计算的成本<br> 每次使用成本：在每次使用资源时发生的成本，或特定任务中发生的一次性成本<br> 固定成本：为任务设定的保持不变的成本，无论任务工期长短或资源工作的工时多少，该成本均保持不变<br> 可以为资源输入几种成本。例如，为工时输入每小时费率，但为出差时间输入固定费率。<br> 根据资源是工时资源（人员或设备）还是材料资源，不同类型成本的计算方式不同。对于工时资源，应用每小时的费率或基于其他时间单位的费率。对于材料资源，应用基于特定单位（例如吨或米）的费率。</p><p>在 Project 中创建预算和跟踪预算的方法</p><p>允许在项目上花费的资金量可能已设定，即自上而下的预算。但是，Project 提供了自下而上的预算方式。<br> 在 Project 中创建预算，首先，输入费率、每次使用成本和固定成本；然后，指定任务的估计工时或工期；最后，为任务分配资源。<br> Project 随后会确定完成项目中所有任务所需的总估计成本。如果此成本不在自上而下的预算范围内，将需要调整费率、资源分配等等。<br> 调整估计成本后，可以保存比较基准计划，这样就建立了项目的预算。<br> 建立预算后，可以通过比较实际支出与计划支出的费用，更好地管理成本，从而可以通过调整来满足预算。在大多数情况下，您需要做的只是输入任务的进度信息。Project 根据任务的进度计算任务的成本。如有必要，也可以输入特定成本。</p><h3 id="基于费率的成本的定义及其计算方法" tabindex="-1"><a class="header-anchor" href="#基于费率的成本的定义及其计算方法" aria-hidden="true">#</a> 基于费率的成本的定义及其计算方法</h3><p>基于费率的资源成本是工时资源（例如人员或设备）的成本，您为这些资源指定了标准费率和加班费率（如果需要），通常按小时计算。当为任务分配资源时，Project 将使用您先前输入的每小时资源费率和完成任务所需的时间计算出资源总成本。</p><p>默认情况下，Project 使用标准资源费率来计算完成任务所需任何工时量的成本。它并不会自动将额外的工作时间作为加班工时进行计算，除非特意将其指定为加班工时。</p><p>因为工时总是表示所完成的工作总量，所以加班工时量包括在工时总量中，而不是添加到工时总量中。例如，如果安排某人工作 40 小时，其中包括每天 8 小时的正常工时和 2 小时的加班工时，您应该为其分配每天 10 小时的工作时间，并指定其中的 2 个小时为加班工时。指定为加班工时的工时成本是按照您为被分配完成这项工作的资源输入的加班费率计算的，而剩余小时是根据标准费率计算的。</p><p>基于费率的材料成本是耗材资源（例如建筑材料或物资）的成本，您可以为材料资源指定标准费率。若要为材料资源分配成本，可以设置每材料单位的费率，例如每米费率或每吨费率。当为任务分配了材料资源时，Project 将使用您输入的材料资源的费率以及完成任务所需的材料数量计算出材料总成本。</p><h3 id="使用成本费率表的方法" tabindex="-1"><a class="header-anchor" href="#使用成本费率表的方法" aria-hidden="true">#</a> 使用成本费率表的方法</h3><p>成本费率表是一个包含资源费率以及材料资源和工时资源的每次使用成本的集合。共有五种成本费率表（A 到 E），因此可以针对不同类型的工作，为同一种资源设置五种不同的费率。例如，您支付给木匠上漆的工作报酬也许比组装框架的工作报酬要多，因此可以对木匠的上漆工作分配应用一种成本费率表，而对组装框架的工作分配应用另一种成本费率表。</p><p>在每个费率表中，最多有 25 行可以用于输入将来的费率更改，例如，费率增长或材料的品种改进。对于每项更改，您都可以指定这些更改生效的日期。例如，如果知道了某个资源将在六个月后提高工资，就可以让 Project 从此时开始自动使用新费率。</p><h3 id="每次使用成本的定义及其计算方法" tabindex="-1"><a class="header-anchor" href="#每次使用成本的定义及其计算方法" aria-hidden="true">#</a> 每次使用成本的定义及其计算方法</h3><p>每次使用成本是使用资源（例如设备）的一次性费用。可以在基于费率的资源成本的基础上输入每次使用成本。例如，每次使用租用的设备时，除了按小时付费之外，也许还需要支付运送或安装费用。</p><p>每次使用成本并不取决于完成的工时数；它们是在每次使用资源时发生的一次性成本。工时资源的每次使用成本取决于所用的工作分配单位数量，而材料资源的每次使用成本只应用一次。例如，如果泥瓦匠的每次使用成本为 ￥100，并且完成任务需要三个泥瓦匠，成本将是 ￥300。但是对于材料资源，例如水泥，如果用于运送的每次使用成本为 ￥100，即使完成该任务需要 10 吨水泥，该费用也只需支付一次。</p><h3 id="固定成本的定义及其计算方法" tabindex="-1"><a class="header-anchor" href="#固定成本的定义及其计算方法" aria-hidden="true">#</a> 固定成本的定义及其计算方法</h3><p>固定成本是任务中保持不变的成本，无论任务工期长短、资源工作的工时多少或工作分配单位数量多少，固定成本均保持不变。</p><p>固定成本可作为对基于费率的资源成本的补充分配给某项任务。例如，如果分配给某任务的资源会涉及差旅成本，该差旅成本可以作为固定量添加到该任务中。固定成本包含在阶段（在摘要任务中）和整个项目的总成本中。</p><h3 id="调节现金流的方法" tabindex="-1"><a class="header-anchor" href="#调节现金流的方法" aria-hidden="true">#</a> 调节现金流的方法</h3><p>将成本分配给任务和资源后，您可决定何时使用累算方法进行成本累算。如果现金流量在您的项目中是一个关键因素，可以更改单个任务的成本累算方式，以确保在您拥有支付用的现金时再进行累算。</p><p>除每次使用成本（它总是在任务开始时累算）外，默认情况下，Project 按比例分配成本，并根据任务完成的百分比进行成本累算，将成本分布到任务的工期内。但是，如果在任务开始时就有一次付清的款项，您也可以在任务开始时进行成本累算，或者如果直到工时完成时才进行支付，也可以在任务结束时进行成本累算。</p><h2 id="_3-跟踪项目成本" tabindex="-1"><a class="header-anchor" href="#_3-跟踪项目成本" aria-hidden="true">#</a> 3. 跟踪项目成本</h2><p>如何判断项目是否符合预算？通过 Project 中的成本跟踪，使用 Project 可以比较原始成本估计、实际成本和计划成本，并在任何时间按照任意详细程度查看成本间的差异。</p><h3 id="什么是成本跟踪过程" tabindex="-1"><a class="header-anchor" href="#什么是成本跟踪过程" aria-hidden="true">#</a> 什么是成本跟踪过程？</h3><p>若要取得最佳的成本跟踪效果，应首先创建一个预算，输入关于任务、资源（如有必要，可以包括工作分配）的费率、每次使用成本和固定成本。然后，指定对于任务的估计工时或工期并为任务分配资源。只有在所有这些步骤完成后，Project 才能计算项目的总估计成本。您可能会对评估进行优化。完成后，保存比较基准计划，从而为该项目建立预算。</p><p>在项目开始后，更新任务的进度（任务完成的工时量或百分比）。Project 根据任务进度计算成本。</p><p>通过合并已完成工时的实际成本和剩余工时的估计成本，Project 可以计算出日程排定）成本（计划成本）。更重要的是，它可以计算出计划成本与比较基准成本之间的差异。这种差异（或成本差异）可以说明项目是否符合预算。</p><p>可以通过查看任务、资源、工作分配和项目的实际成本及排定成本（计划成本），进行简单的成本跟踪。</p><p>如果您已经通过比较基准创建了预算，可以通过将实际成本和计划成本与比较基准成本进行比较，进行更广泛的跟踪。</p><p>通过查看计划成本与比较基准成本之间的成本差异，可以判断项目是否符合预算。例如，如果任务预算的成本为 ￥50，但是任务已完成一半，而已花费的成本是 ￥35，计划成本为 ￥60（当前 ￥35 的实际成本加上任务剩余工时的 ￥25 的预期成本）。成本差异为 ￥10（￥60 的实际成本减去 ￥50 的预算成本）。</p><p>通过定期监控成本差异，可以采取措施确保项目接近预算。</p><h3 id="在哪里可查看成本信息" tabindex="-1"><a class="header-anchor" href="#在哪里可查看成本信息" aria-hidden="true">#</a> 在哪里可查看成本信息？</h3><p>在 Project 中可以查看关于任务、资源和工作分配的成本。也可以查看项目成本，该成本通常基于这些更详细的成本。您也可查看总成本和时间分段成本（随时间分布的成本）。</p><p>在 Project 中，有各种不同的方法查看成本信息：<br> 若要查看项目总成本，请单击“项目信息” 对话框中的“统计”按钮。<br> 若要查看计划成本、比较基准成本、实际成本和剩余成本（以及成本差异），请将“成本表”应用于任务工作表视图。计划成本显示在“总成本”域或“成本”域中。<br> 若要查看任务的总成本，请应用“甘特图”视图跟踪计划成本。<br> 若要更密切地监视成本，以便使成本更接近预算，请应用“资源使用状况”和“任务分配状况”视图，查看到当前日期为止的时间分段成本。<br> 若要通过盈余分析来查看项目成本业绩，请将“盈余分析”表应用于任何工作表视图。<br> 您可以通过选择“格式”菜单上“详细信息”项的“成本”，在一些视图中查看成本的详细信息。也可通过插入成本列，在任意工作表视图中添加特定的成本域。也可以通过使用“格式”菜单上的“条形图样式”设置条形图的格式，以便在“甘特图”中的条形图旁显示成本域。</p>',42),o=[h];function p(d,i){return r(),a("div",null,o)}const s=e(c,[["render",p],["__file","mngtools7.html.vue"]]);export{s as default};
