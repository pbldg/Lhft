

//根据表名，取表字段列表
function getFields(tableSelectId,fieldSelectId,defaultFieldName){
	var tableName = $("#"+tableSelectId).find("option:selected").val();
	var selectedText = $("#"+tableSelectId).find("option:selected").text();
	var connId = selectedText.split("-")[2];
	var schema = selectedText.split("-")[3];
	if(connId == "请选择"){
		connId = "";
	}
	if(tableName!=""){
    	changeChildSelect(fieldSelectId,'HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=form.metadata!queryFieldsByTable&TABLE_NAME='+tableName+"&CONN_ID="+connId+"&SCHEMA="+schema,defaultFieldName);
	}
}

/**
 * 取下拉框选中的文本值
 * @param selectedId
 */
function getSelectedText(selectedId){
	return $(selectedId).find("option:selected").text();
}

/**
 * 取选中的radio的值 
 * @param radioname radio的name属性
 * @returns
 */
function getRadioValue(radioname){
	return $("input[name='"+radioname+"']:checked").val();
}
/**
 * 设置radio选中
 * @param radioname radio的name属性
 * @param value 被选中的radio的value属性
 */
function setRadioValue(radioname,value){
	$("input[name='"+radioname+"'][value='"+value+"']").attr("checked",true);
}

/**
 * 取checkbox选中的值
 * @param checkboxname checkbox的name属性
 * @returns
 */
function getCheckboxValue(checkboxname){
	var val = "";
	$.each($("input[name='"+checkboxname+"']:checked"),function(i,item){
		val += "," + $(item).val();
	});
	if(val!=""){
		return val.substring(1);
	}else{
		return val;
	}
}

//企业类型多选
function onCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("popEnpTree"),
	nodes = zTree.getCheckedNodes(true),
	v = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	var cityObj = $("#TYPENAME");
	cityObj.attr("value", v);
}

/**
 * 判断用户是否选中的使子节点
 */
function beforeClick(treeId, treeNode) {
	var check = (treeNode && !treeNode.isParent);
	if (!check) $.uialert("只能选择子节点！");
	return check;
}

/**
 * 加载企业类型树
 * @param url 跳转地址
 */
function loadTreeData(url){
	//加载弹出树
	$.ajax({  
        async : false,  
        cache:false,  
        type: 'POST',  
        dataType : "json",  
        url: url,
        error: function () {
            alert('请求失败');  
        }, 
        success:function(data){ 
            popNodes = data;   
            tmpNodes = data;
        }  
    });
}

/**
 * 请求加载树路径
 * @param url
 */
function loadTreeData(url){
	//加载弹出树
	$.hkajax(
	        url,//请求的action路径  
	        "",
	        {
		        success:function(data){ //请求成功后处理函数。
		        	 popNodes = data;   //把后台封装好的简单Json格式赋给treeNodes  
			         tmpNodes = data;
		        }  
	        }); 
	}


/**
 * 下拉弹出树
 * @param menuContent 
 * @param popTree
 * @param inputID
 * @param inputName
 */
function showMenu(inputID,inputName) {
	tmpNodes = popNodes;
	$.fn.zTree.init($("#popTree"), setting, tmpNodes);
	
	var popTree = $.fn.zTree.getZTreeObj("popTree");
	if(popTree)
		popTree.expandAll(true);//展开
	
	var cityObj = $("#"+inputName);
	var cityOffset = $("#"+inputName).offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight()+ "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}
function getInfo(id,name,inputID,inputName){
	$("#"+inputName).val(name);
	$("#"+inputID).val(id);
	}
/**
 * 查询条件重置
 * @param formobj 查询条件所在的表单对象
 */
function formreset(formobj){
	var $formobj = $("#"+formobj)
	$.each($formobj.find(":input[type!=button]"),function(i,item){
		$(item).val("");
	})
}
/**
 * 弹出报告选择框 
 * @param entId 要选择报告范围，指定企业
 * @param popSource 弹出源POP:弹出窗口，TAB:tab页
 * @param onlyOne 是否只能选择一条记录
 */
function popReport(entId,popSource,onlyOne,callback) {
	
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=sw.order!openReportSelect&ENT_ID=";
	url += entId;
	url += "&POP_SOURCE="+popSource;//弹出源：POP:弹出窗口，TAB:tab窗口
	url += "&ONLYONE="+onlyOne;//是否只能选择一条记录
	if(callback) {
		url += "&CALLBACK=" + callback;
	}
	$.uiPopWindow(
			'reportDialog',
			url,
			{
				closeOnEscape: true,
				title: "诚信报告选择窗口", 
				width: 600, 
				height: 450, 
				draggable: true
			});
}

function popResult(entId,popSource,onlyOne,callback) {
	
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=evaluate.enterprise!openSelect&ENT_ID=";
	url += entId;
	url += "&POP_SOURCE="+popSource;//弹出源：POP:弹出窗口，TAB:tab窗口
	url += "&ONLYONE="+onlyOne;//是否只能选择一条记录
	if(callback) {
		url += "&CALLBACK=" + callback;
	}
	$.uiPopWindow(
			'resultDialog',
			url,
			{
				closeOnEscape: true,
				title: "诚信评价结果选择窗口", 
				width: 600, 
				height: 450, 
				draggable: true
			});
}

