/**
 * 创建新的流程
 * @param flowId 流程ID
 * @param flowVersion 流程版本号
 */
function gotoNewInstancePage(flowId,flowVersion){
	var url = COMMON_ACTION+"workflow.test!gotoNewWflowInstancePage&CMD=A&WF_DIC="+flowId+"//"+flowVersion;
	popSaveInfo(url,"流程新增测试",$(window).width(),$(window).height()+100);
}