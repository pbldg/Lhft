//展开第一级节点
function expandFirstLevel(treeId,rootValue){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var node = treeObj.getNodeByParam("id", rootValue, null);
	treeObj.expandNode(node,true,false);
}