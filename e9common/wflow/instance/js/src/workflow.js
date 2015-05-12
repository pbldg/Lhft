//撤回
function withdrawWorkFlow(obj,activityUuid){
	var urls = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!checkWithDrawWorkflow&WF_ACTIVITY_UUID="+activityUuid;
	$.hkajax(urls,
			"",
			{
				success:function(data){
					getCheckWithdrawResult(data,activityUuid,obj);
				}
			}		
	);
}
//回调时用
function getCheckWithdrawResult(jsonData,activityUuid,obj){
	if(jsonData.result=='1'){
		$.uiconfirm("是否进行撤回?","系统提示",
				function(){
					$(obj).attr("disabled","disabled");
					var urls = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!withDrawWorkflow&WF_ACTIVITY_UUID="+activityUuid;
					//调用ajax传回数据，执行后回调execData函数
					//ajaxData(urls,"getWithdrawResult");
					$.hkajax(urls,"",{
						success:function(data){
							getWithdrawResult(jsonData);
						}
					});
		},
				function(){
			
		});
	}else{
		$.uialert("撤回失败："+jsonData.result);
		return;
	}	
}
//回调时用
function getWithdrawResult(jsonData){
	if(jsonData.result=='1'){
		//AjaxQuery();
		$("#searchBtn").click();
		$.uiselfmessage("撤回成功！");	
	}else{
		$.uialert("撤回失败："+jsonData.result);
		return;
	}
}

//查看流程图（使用svg方式）
function showWorkflowSvg(gridTableId){
	var tab_num = $tabobj.tabs('option', 'selected')+1;
	var selectedId = getSelectedCheckbox(gridTableId);
	if(!selectOne(selectedId))return;
	var rowData = $("#"+gridTableId).jqGrid("getRowData", selectedId);  
	var url = "";
	if(tab_num==1){
		url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!showWorkflowSvg&FLOW_ID="+rowData.FLOW_ID+"&FLOW_VERSION="+rowData.FLOW_VERSION;
	}else if(tab_num==2 || tab_num==4 ){
		url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!showWorkflowSvg&WF_ACTIVITY_UUID="+rowData.ACTIVITY_UUID;
	}else if(tab_num==3 || tab_num==5 ){
		url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!showWorkflowSvg&WF_INSTANCE_UUID="+rowData.UUID;
	}
	popReadInfo(url,"查看流程",$(window).width()+200,$(window).height()+50);
	
}

function getFlowVersion(flowId){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!getLastFlowVersion&FLOW_ID="+flowId;
	$.hkajax(url,"",{
		success:function(data){
			$("#FLOW_VERSION").val(data.flowVersion);
		}
	});
}