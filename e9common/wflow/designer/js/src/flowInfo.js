//显示隐藏table
function showTab(num){
	for(var i=1;i<=5;i++){
		$("#id_tab_"+i).hide();
		$('#id_a_tab_'+i).removeClass(); 
	}
	$("#id_tab_"+num).show();
	$('#id_a_tab_'+num).addClass("on"); 
}

//克隆行的字符串
var wf_param_tr="<tr id='id_tr_wf_checkbox'><td><input type='checkbox' id='wf_checkbox'/></td><td><input type='text' id='wf_paramName' size='10' onchange='setParam(1)'/></td><td><input type='text' id='wf_paramValue' size='10' onchange='setParam(1)'/></td><td><input type='text' id='wf_paramRemark' size='10' onchange='setParam(1)'/></td></tr>";
var wf_param_o_tr="<tr id='id_tr_wf_o_checkbox'><td><input type='checkbox' id='wf_o_checkbox'/></td><td><input type='text' id='wf_o_paramName' size='16' onchange='setParam(2)'/></td><td><input type='text' id='wf_o_paramRemark' size='16' onchange='setParam(2)'/></td></tr>";
var wf_param_n_tr="<tr id='id_tr_wf_n_checkbox'><td><input type='checkbox' id='wf_n_checkbox'/></td><td><input type='text' id='wf_n_paramName' size='16' onchange='setParam(3)'/></td><td><input type='text' id='wf_n_paramRemark' size='16' onchange='setParam(3)'/></td></tr>";

//全选、取消
function selectAllCheckBox(s_id){
	var s_val=0;
	$.each($("input[id='"+s_id+"']"),function(id){
		if(id==0){
			if($(this).attr('checked') && $(this).attr('checked')=='checked'){
				s_val=1;
			}					
		}else{
			if(s_val==1){
				$(this).attr('checked','checked');
			}else{
				$(this).attr('checked',false);
			}
		}
	});
}
//删除行
function delTr(s_id){
	var s_ids='';
	$.each($("input[id='"+s_id+"']"),function(id){
		if(id!='0'){
			if($(this).attr('checked') && $(this).attr('checked')=='checked'){
				s_ids=s_ids+','+id;
			}
		}
	});
	if(s_ids==''){
		alert('请选择要删除的参数！');
		return;
	}
		
	
	$.each(s_ids.substring(1, s_ids.length).split(","),function(id,item){
		//alert(item);
		var str;
		var s_json="";
		var s_val='';
		s_val=$("input[id='"+s_id.replace('checkbox',"paramName")+"']").get(parseInt(item)-1).value;
		if(s_id=='wf_checkbox'){							
			s_json="flowParameter";
		}else if(s_id=='wf_o_checkbox'){							
			s_json="activityParameter";
			//同时删除活动环节已配置的参数值
			$.each(parent.jsonData_activity,function(a_id,a_item){
				try{
					str="delete parent.jsonData_activity."+a_id+".parameters."+s_val;
					eval(str);
				}catch (e) {
				}
			});						
		}else if(s_id=='wf_n_checkbox'){							
			s_json="operaterParameter";
			//同时删除结果线已配置的参数值
			$.each(parent.jsonData_operater,function(a_id,a_item){
				try{
					str="delete parent.jsonData_operater."+a_id+".parameters."+s_val;
					eval(str);
				}catch (e) {
				}
			});	
		}
		try{
			str="delete parent.jsonData_workflow."+s_json+"."+s_val;
			eval(str);
		}catch (e) {
			
		}	
	});
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_workflow));

	s_ids=s_ids+",";				
	$.each($("tr[id='id_tr_"+s_id+"']"),function(id){
		if(s_ids.indexOf(","+id+",")>-1){
			$(this).remove();				
		}
	});	
	alert('删除成功！');
}

function setParam(num){
	var s_id="wf_paramName";
	var s_json="flowParameter";
	if(num=='1'){
		//流程属性
	}else if(num=='2'){
		//活动属性
		s_id="wf_o_paramName";
		s_json="activityParameter";
	}else if(num=='3'){
		//结果线属性
		s_id="wf_n_paramName";
		s_json="operaterParameter";
	}
	
	var str="parent.jsonData_workflow."+s_json+"=jQuery.parseJSON('{}')";
	eval(str);
	$.each($("input[id='"+s_id+"']"),function(id){
		if($(this).val()!=''){
			str ="parent.jsonData_workflow."+s_json+"."+$(this).val()+"=jQuery.parseJSON('{}');";
			eval(str);
			if(num=='1'){
				str="parent.jsonData_workflow."+s_json+"."+$(this).val()+".value=\""+$("input[id='"+s_id.replace("Name","Value")+"']").get(id).value+"\"";
				eval(str);
			}	
			str="parent.jsonData_workflow."+s_json+"."+$(this).val()+".remark=\""+$("input[id='"+s_id.replace("Name","Remark")+"']").get(id).value+"\"";
			eval(str);
		}
	});
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_workflow));
}
/*
*内容更改时更新
*/
function changeFlowInfo(val,obj_id){
	var str="parent.jsonData_workflow."+obj_id+"='"+val.replace(/'/g,"")+"'";
	eval(str);
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_workflow));
}	

$(function(){
	if(!parent.jsonData_workflow.flowParameter){
		parent.jsonData_workflow.flowParameter=jQuery.parseJSON('{}');
	}
	$.each(parent.jsonData_workflow.flowParameter,function(id,item){
		var str=wf_param_tr.replace('wf_paramName',"wf_paramName' value='"+id);
		str=str.replace("wf_paramValue","wf_paramValue' value='"+item.value);
		str=str.replace("wf_paramRemark","wf_paramRemark' value='"+item.remark);
		//alert(str);
		$('#id_tab_2').append(str);
	});
	
	if(!parent.jsonData_workflow.activityParameter){
		parent.jsonData_workflow.activityParameter=jQuery.parseJSON('{}');
	}
	$.each(parent.jsonData_workflow.activityParameter,function(id,item){
		var str=wf_param_o_tr.replace("wf_o_paramName","wf_o_paramName' value='"+id);
		str=str.replace("wf_o_paramRemark","wf_o_paramRemark' value='"+item.remark);
		$('#id_tab_3').append(str);
	});
	
	
	if(!parent.jsonData_workflow.operaterParameter){
		parent.jsonData_workflow.operaterParameter=jQuery.parseJSON('{}');
	}
	$.each(parent.jsonData_workflow.operaterParameter,function(id,item){
		var str=wf_param_n_tr.replace("wf_n_paramName","wf_n_paramName' value='"+id);
		str=str.replace("wf_n_paramRemark","wf_n_paramRemark' value='"+item.remark);
		$('#id_tab_4').append(str);
	});
	
	if(!parent.jsonData_workflow.flowId){
		parent.jsonData_workflow.flowId="";
	}
	$("#id_flow_id").val(parent.jsonData_workflow.flowId);
	
	if(!parent.jsonData_workflow.flowName){
		parent.jsonData_workflow.flowName="";
	}
	$("#id_flow_name").val(parent.jsonData_workflow.flowName);
	
	if(!parent.jsonData_workflow.flowVersion){
		parent.jsonData_workflow.flowVersion="0";
	}
	$("#id_flow_version").val(parent.jsonData_workflow.flowVersion);
			
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_workflow));
});	