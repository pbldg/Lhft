var wf_if_select_activity_user="1";//是否需要选择用户,0为不需要
var wf_option_html="";//加载完成后的初始保存下拉的option值

$(function(){
	var json_wf_parameter=jQuery.parseJSON($("#WF_WORKFLOW_PARAMETER_JSON_STRING").val());
	for(var i=0;i<json_wf_parameter.length;i++){
		if(json_wf_parameter[i].id=='WF_IF_SELECT_ACTIVITY_USER'){
			wf_if_select_activity_user=json_wf_parameter[i].value;
			break;
		}
	}
	//处理结果的onchange事件
	$('#WF_OPERATER_ID').change(function(){
		//ShowLoadingNotice();			
		var urls = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!getWorkFlowConfigInfo&TYPE=1";
		urls=urls+"&WF_OPERATER_ID="+$(this).val();
		urls=urls+"&WF_ACTIVITY_ID="+$("#WF_ACTIVITY_ID").val();			
		urls=urls+"&WF_FLOW_ID="+$("#WF_FLOW_ID").val();
		urls=urls+"&WF_FLOW_VERSION="+$("#WF_FLOW_VERSION").val();
		//采用同步处理
		ajaxData_2(urls,"wf_getAjaxQueryFromOperaterId");
	});
	wf_option_html=$("#td_wf_operater_id").html();//初始值保留
	//执行操作处理结果的初始js函数，判断是否需要隐藏
	wf_execOperationJsFunc();
	//转radio风格
	wf_setSelect2Radio();
	//如果没有选择用户的，则把操作结果转成按钮操作
	if(wf_if_select_activity_user=='0'){
		wf_setOperationButton();
	}else{
		$("#tr_wf_operater_info").show();
	}
	//设置表单的属性
	wf_set_business_rules();
	//触发下拉事件
	$("#WF_OPERATER_ID").trigger("change");

	//这里处理直接添加待办的
	addOtherTodoActivityInfo();
});


//处理可直接增加待办的环节
function addOtherTodoActivityInfo(){
	if($("#WF_ACTIVITY_PARAMETER_JSON_STRING").val().indexOf("WF_ACTIVITY_ADD_OTHER_ACTIVITY_USERS")>-1){
		var s_activity="";
		var json_tmp=jQuery.parseJSON($("#WF_ACTIVITY_PARAMETER_JSON_STRING").val());
		$.each(json_tmp,function(id,t_data){
			if(t_data.id=='WF_ACTIVITY_ADD_OTHER_ACTIVITY_USERS'){
				s_activity=t_data.value;
				return false
			}
		});

		if(s_activity!=""){
			var urls = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!getAddTodoActivityConfigInfo";
			urls=urls+"&WF_ACTIVITY_IDS="+s_activity;			
			urls=urls+"&WF_FLOW_ID="+$("#WF_FLOW_ID").val();
			urls=urls+"&WF_FLOW_VERSION="+$("#WF_FLOW_VERSION").val();
			urls=urls+"&WF_INSTANCE_UUID="+$("#WF_INSTANCE_UUID").val();
			//采用同步处理
			ajaxData_2(urls,"wf_getAddOtherTodoActivity");
		}		
	}
}


//添加待办活动环节的回调函数
function wf_getAddOtherTodoActivity(s_result){
	var s_getData=jQuery.parseJSON(s_result.datas);
	var s_table="<table>"
	for(var i=0;i<s_getData.length;i++){
		s_table+="<tr><td>";
		s_table+="【<a title='请点击选择!' href='#' onclick=\"wf_selectOtherActivityUsers("+i+",'"+s_getData[i].userScope+"','"+s_getData[i].userPower+"','"+s_getData[i].userType+"');return false;\">"+s_getData[i].name+"</a>】";

		s_table+="</td><td>";
		s_table+="<input type='hidden' name='WF_ADD_OTHER_OPERATER_PROPERTY_JSON' id='WF_ADD_OTHER_OPERATER_PROPERTY_JSON_"+i+"' value='"+s_getData[i].x+"'/>";
		s_table+="<input  id='SPAN_WF_ADD_OTHER_OPERATER_USERNAMES_"+i+"' type='text'  readonly style='cursor:pointer;' onclick=\"wf_selectOtherActivityUsers("+i+",'"+s_getData[i].userScope+"','"+s_getData[i].userPower+"','"+s_getData[i].userType+"');return false;\"/>"
		s_table+="<input name='WF_ADD_OTHER_OPERATER_USERNAMES' id='WF_ADD_OTHER_OPERATER_USERNAMES_"+i+"' type='hidden' value=''/>"
		s_table+="<input name='WF_ADD_OTHER_ACTIVITY_ID' id='WF_ADD_OTHER_ACTIVITY_ID_"+i+"' type='hidden' value='"+s_getData[i].id+"'/>"
		s_table+="<input name='WF_ADD_OTHER_OPERATER_USERIDS' id='WF_ADD_OTHER_OPERATER_USERIDS_"+i+"' type='hidden' value=''/>"
		s_table+="<input name='WF_ADD_OTHER_OPERATER_USER_INFOS' id='WF_ADD_OTHER_OPERATER_USER_INFOS_"+i+"' type='hidden' value=''/>"

		if(s_getData[i].todoUsername){
			s_table+="<br/><span title='当前已有待办人'>"+s_getData[i].todoUsername+"</span>";
		}		
		s_table+="</td></tr>";
	}
	s_table+="</table>";
	//alert(s_table);
	$("#td_wf_add_other_activity").html(s_table);
	$("#tr_wf_add_other_activity_info").show();
}


//设置表单的属性
function wf_set_business_rules(){
	var arr_obj=jQuery.parseJSON($("#WF_SET_BUSINESS_RULES").val());
	if(arr_obj.length>0){		
		for(var i=0;i<arr_obj.length;i++){
			//RULE_TYPE:1只读 2可写   RULE_CODE:1包含 2等于 内容：RULE_VALUE
			var str="";
			if(arr_obj[i].RULE_VALUE!="ALLDATA"){
				str="[name"+(arr_obj[i].RULE_CODE==2?"":"*")+"='"+arr_obj[i].RULE_VALUE+"']";
				str="textarea"+str+",input"+str+",select"+str;
				$(str).not("[name^='WF_']").not("[name='button']").each(function(){ 
					wf_set_business_rules_single(arr_obj[i].RULE_TYPE,$(this),i);					
				});	
			}else{
				str="textarea,input,select";
				$(str).not("[name^='WF_']").not("[name='button']").each(function(){ 
					//排除以WF_开头
					wf_set_business_rules_single(arr_obj[i].RULE_TYPE,$(this),i);
				});	
			}
		}
	}
}

//根据RULE_TYPE:1只读 2可写 ，以及选择到的对象进行设置
function wf_set_business_rules_single(rule_type,obj,num){	
	if(obj.attr("type")=='hidden'){
		return;
	}		
	if(rule_type==1){
		if(obj.get(0).style.display!="none" || obj.is(":visible")){
			obj.hide();
			if(obj.attr("type")=='radio' || obj.attr("type")=='checkbox'){
				if(obj.attr("checked") ){
					obj.parent().append(" [√] ");
				}else{
					obj.parent().hide();							
				}
			}else{
				if(obj.is("select")){
					if(obj.attr("multiple")){
						obj.parent().prepend(" "+obj.text()+" ");
					}else{
						obj.parent().prepend(" "+obj.find("option:selected").text()+" ");
					}
				}else{				
					obj.parent().prepend(" "+setDelWordWrap(obj.val())+" ");
				}						
			}
		}
	}else{
		if(obj.get(0).style.display=="none" || obj.is(":hidden")){
			obj.show();
			if(obj.attr("type")=='radio' || obj.attr("type")=='checkbox'){
				obj.parent().show();			
				if(obj.attr("checked") ){
					var s_html=obj.parent().html();
					s_html=s_html.replace(" [√] ","");
					obj.parent().html(s_html);
				}			
			}else{
				var s_html=obj.parent().html();
				if(s_html!=null){
					var s_value="";
					if(obj.is("select")){
						if(obj.attr("multiple")){
							s_value=obj.text();
						}else{
							s_value=obj.find("option:selected").text();
						}						
					}else{
						s_value=obj.val();
					}					
					s_html=s_html.replace(" "+setDelWordWrap(s_value)+" ","");
					obj.parent().html(s_html);
				}
			}
		}
	}
}

//删除换行符
function setDelWordWrap(s_value){
	var re = new RegExp("\r","ig");
	s_value = s_value.replace(re,"");					
	re = new RegExp("\n","ig");
	s_value = s_value.replace(re,"");	
	return s_value;
}


//下拉框回调时用
function wf_getAjaxQueryFromOperaterId(jsonData){
	//后续清空
	$("#td_wf_next_activity").html("&nbsp;");
	$("#tr_wf_next_activity_info").hide();	
	if(jsonData.result=='0'){
		HideLoadingNotice();
		return;
	}
	var obj = jQuery.parseJSON(jsonData.datas);
	obj = jQuery.parseJSON(obj.result);
	if(obj.length==0){
		HideLoadingNotice();
		return;
	}
	
	var s_userNum="";

	var if_show=0;
	var tb_html="<table>";
	for(var i=0;i<obj.length ;i++){
		//是否有默认值： 99为无，1为当前用户
		if(obj[i].NEXT_ACTIVITY_LINE.defaultUser=="99" && if_show==0){
			if_show=1;
		}
		var s_title="默认用户="+obj[i].NEXT_ACTIVITY_LINE.defaultUser;
		if(obj[i].NEXT_ACTIVITY_LINE.defaultUserActivityId){
			s_title +="(活动环节："+obj[i].NEXT_ACTIVITY_LINE.defaultUserActivityId+")";
		}			
		
		s_title +=",活动节点id="+obj[i].NEXT_ACTIVITY_LINE.activityId;
		if(obj[i].resourceId){
			s_title +=",权限资源="+obj[i].ACTIVITY.userPower;
		}
		s_title +=",活动权限范围(0个人1部门2机关)="+obj[i].ACTIVITY.userScope;
		s_title +=",活动类型(0任意一人1多人顺序2多人并行)="+obj[i].ACTIVITY.type;
		
		tb_html +="<tr";				
		if(obj[i].NEXT_ACTIVITY_LINE.defaultUser!="99" ){
			tb_html +=" style='display:none;'";
		}				
		tb_html +="><td align='left'>";	

		//start以下处理配置了默认处理人的情况******
		var params = $.parseJSON(obj[i].ACTIVITY_PARAMETERS);
		var defaultOperator = "";
		var defaultUserId = "";
		var defaultUserName = "";
		$.each(params,function(r,item){
			if(item.id=="WF_DEFAULT_NEXT_OPERATOR"){
				var val = item.value;
				if(val!=""){
					if(val.indexOf(";")>0){
						defaultUserId = val.split(";")[0];
						defaultUserName = val.split(";")[1];
					}else{
						alert("参数<WF_DEFAULT_NEXT_OPERATOR>格式不正确："+val);
					}
				}
			}
		});
		//end*************
		tb_html +="<input type='hidden' name='WF_NEXT_ACTIVITY_ID' id='WF_NEXT_ACTIVITY_ID' value='"+obj[i].NEXT_ACTIVITY_LINE.activityId+"'/>";
		tb_html +="<input type='hidden' name='WF_NEXT_ACTIVITY_PROPERTY_JSON' id='WF_NEXT_ACTIVITY_PROPERTY_JSON_"+i+"' value='"+jQuery.stringifyJSON(obj[i].ACTIVITY_PARAMETERS)+"'/>";
		tb_html +="<input type='hidden' name='WF_NEXT_ACTIVITY_OPERATER_USERIDS'   id='WF_NEXT_ACTIVITY_OPERATER_USERIDS_"+i+"' value='"+defaultUserId+"'/>";
		
		tb_html +="<input type='hidden' name='WF_NEXT_ACTIVITY_OPERATER_USER_INFOS' id='WF_NEXT_ACTIVITY_OPERATER_USER_INFOS_"+i+"' value=''/>";
		tb_html +="<input type='hidden' name='WF_NEXT_ACTIVITY_OPERATER_USERNAMES' id='WF_NEXT_ACTIVITY_OPERATER_USERNAMES_"+i+"' value='"+defaultUserName+"'/>";
		
		if(wf_if_select_activity_user=='0'){
			//不需要选择用户的
			tb_html +="【"+obj[i].ACTIVITY.name+"】";
		}else{
			if(obj[i].NEXT_ACTIVITY_LINE.defaultUser!="99" ){
				tb_html +="【"+obj[i].ACTIVITY.name+"】";
			}else{
				tb_html +="【<a title='请点击选择!' href='#' onclick=\"wf_selectUsers("+i+",'"+obj[i].ACTIVITY.userScope+"','"+obj[i].ACTIVITY.userPower+"','"+obj[i].ACTIVITY.userType+"');return false;\">"+obj[i].ACTIVITY.name+"</a>】";
			}	
			
			tb_html +="</td>";		
			tb_html +="<td>";		
			if(obj[i].NEXT_ACTIVITY_LINE.defaultUser=="99" ){
				s_userNum+=","+i;
				if(obj[i].ACTIVITY_PARAMETERS){		
					var json1=jQuery.parseJSON(obj[i].ACTIVITY_PARAMETERS);					
					for(var p=0;p<json1.length;p++){
						if(json1[p].id=='WF_ACTIVITY_USER_EMPTY_FLAG'){							
							if(json1[p].value=="1"){
								s_userNum=s_userNum+"v";
								break;
							}
						}
					}
				}				
				tb_html +="<input size='50' id='SPAN_WF_NEXT_ACTIVITY_OPERATER_USERNAMES_"+i+"' onclick=\"wf_selectUsers("+i+",'"+obj[i].ACTIVITY.userScope+"','"+obj[i].ACTIVITY.userPower+"','"+obj[i].ACTIVITY.userType+"');return false;\"";
				tb_html +=" class='txtitem' required='true' check='yz_notblank' warning='请选择用户!' value='"+defaultUserName+"'/>";
				
				if(s_userNum.substring(s_userNum.length -1)!="v"){
					tb_html +="<font color='red'>*</font>";
				}

			}else{
				tb_html +="&nbsp;";
			}
		}		
		tb_html +="</td></tr>";			
	}
	tb_html +="</table>";
	$("#td_wf_next_activity").html(tb_html);

	//alert(s_userNum);

	//添加必选用户的验证
	if(s_userNum!=""){
		var arr_userNum=s_userNum.substring(1).split(",");
		for(var k=0;k<arr_userNum.length;k++){
			if(arr_userNum[k].indexOf("v")<0){
				$("#SPAN_WF_NEXT_ACTIVITY_OPERATER_USERNAMES_"+k).attr("data-validation-engine","validate[required]");
			}			
			$("#SPAN_WF_NEXT_ACTIVITY_OPERATER_USERNAMES_"+k).attr("readonly","readonly");
			$("#SPAN_WF_NEXT_ACTIVITY_OPERATER_USERNAMES_"+k).css("cursor","pointer")
		}
	}

	if(if_show==1 && wf_if_select_activity_user!='0'){
		$("#tr_wf_next_activity_info").show();
	}
	HideLoadingNotice();

}

//把发送按钮换成操作结果的按钮
function wf_setOperationButton(){
	$("#input_form_submit_button").remove();
	var radio_button_html="";
	$("#WF_OPERATER_ID option").each(function(){
		radio_button_html+="<input type='submit' name='button' class='btn_saveshort' onclick=\"$('#WF_OPERATER_ID').val('"+$(this).val()+"');$('#WF_OPERATER_ID').trigger('change');\" onMouseOver=\"this.className='btn_saveshort_hover'\" onMouseOut=\"this.className='btn_saveshort'\" value='"+$(this).text()+"' />";
	});
	$("#span_form_submit_button").html(radio_button_html);
}


//检查操作处理结果的js函数
function wf_execOperationJsFunc(){
	ShowLoadingNotice();
	$("#WF_OPERATER_ID option").each(function(){
		var js_func=$(this).attr("jsFunc");
		if(js_func && ""!=js_func){
			try{
				if(eval(js_func)==false){
					$(this).remove();
				}
			}catch(err){
				alert("执行操作处理结果函数【"+js_func+"】出错："+err);					
				return false;
			}
		}
	});
	HideLoadingNotice();
}
function ShowLoadingNotice(){
	
}
function HideLoadingNotice(){
	
}


//活动节点的操作人选择
function wf_selectOtherActivityUsers(num,userType,resourceId,activityType){
	//userType   用户类型(活动权限范围(0个人1部门2机关))
	//resourceId 资源权限
	//activityType 活动类型(0任意一人1多人顺序2多人并行)
	//var urls = "HttpChannel?action=WFLOW_SELECT_USER_MAIN";	
	var urls = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!popSelectUser";	
	//用户id串
	urls+= "&userId=WF_ADD_OTHER_OPERATER_USERIDS_"+num;
	//用户名串
	urls+= "&userName=WF_ADD_OTHER_OPERATER_USERNAMES_"+num;
	//用户附加信息串，用于存储用户单位、部门等信息
	urls+= "&userInfo=WF_ADD_OTHER_OPERATER_USER_INFOS_"+num;
	//回调函数
	urls+= "&backCallFuncName=";
	//活动节点的属性json串array
	//urls+= "&activityPropertyJson=WF_NEXT_ACTIVITY_PROPERTY_JSON_"+num;
	urls+= "&activityPropertyJson=";
	urls+= "&POP_SOURCE=POP";
	urls+= "&USER_TYPE="+userType;
	urls+= "&ACTIVITY_TYPE="+activityType;
	urls+= "&RESOURCE_ID="+resourceId;
	
	//showDivWindow("选择"+(userType=='0'?'人员':(userType=='1'?'部门':'机关')),urls,"390","840");
	$.uiPopWindow(
			'workflowUserDialog',
			urls,
			{
				closeOnEscape: true,
				title: "选择"+(userType=='0'?'人员':(userType=='1'?'部门':'机关')), 
				width: 600, 
				height: 450, 
				draggable: true
			});
}


//活动节点的操作人选择
function wf_selectUsers(num,userType,resourceId,activityType){
	//userType   用户类型(活动权限范围(0个人1部门2机关))
	//resourceId 资源权限
	//activityType 活动类型(0任意一人1多人顺序2多人并行)
	//var urls = "HttpChannel?action=WFLOW_SELECT_USER_MAIN";	
	var urls = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=workflow.test!popSelectUser";	
	//用户id串
	urls+= "&userId=WF_NEXT_ACTIVITY_OPERATER_USERIDS_"+num;
	//用户名串
	urls+= "&userName=WF_NEXT_ACTIVITY_OPERATER_USERNAMES_"+num;
	//用户附加信息串，用于存储用户单位、部门等信息
	urls+= "&userInfo=WF_NEXT_ACTIVITY_OPERATER_USER_INFOS_"+num;
	//回调函数
	urls+= "&backCallFuncName=";
	//活动节点的属性json串array
	urls+= "&activityPropertyJson=WF_NEXT_ACTIVITY_PROPERTY_JSON_"+num;
	urls+= "&POP_SOURCE=POP";
	urls+= "&USER_TYPE="+userType;
	urls+= "&ACTIVITY_TYPE="+activityType;
	urls+= "&RESOURCE_ID="+resourceId;
	
	//showDivWindow("选择"+(userType=='0'?'人员':(userType=='1'?'部门':'机关')),urls,"390","840");
	$.uiPopWindow(
			'workflowUserDialog',
			urls,
			{
				closeOnEscape: true,
				title: "选择"+(userType=='0'?'人员':(userType=='1'?'部门':'机关')), 
				width: 600, 
				height: 450, 
				draggable: true
			});
}

//radio的点击，模拟select的选中
function wf_selectOperList(operaterId){		
	$("#WF_OPERATER_ID option").each(function(){
		if(operaterId==$(this).val()){
			$(this).attr("selected",true);
			$("#WF_OPERATER_ID").trigger("change");
			return;
		}
	});
}

//把操作结果的select变成radio的
function wf_setSelect2Radio(){
	var s_html="";
	var i_start=0;
	$("#WF_OPERATER_ID option").each(function(){
		i_start++;
		s_html+="<input type='radio' name='WF_OPERRADIO' id='wf_operRadio_"+i_start+"'";
		if(i_start==1){
			s_html+=" checked";
		}
		s_html+=" onclick=\"wf_selectOperList('"+$(this).val()+"');\"/><label for='wf_operRadio_"+i_start+"' style='cursor:pointer;'>"+$(this).text()+"</label>";
	});
	$("#span_radio").html(s_html);
}
/**
 * 同步执行jquery的ajax请求
 * @param url 地址
 * @param func 回调函数
 */
function ajaxData_2(url,func){
	var s_result={result:"0",datas:""};
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		async:false, //同步
		data:{},
		timeout: 30000, //超时时间：30秒
		error: function(XMLHttpRequest, textStatus, errorThrown){
			s_result.result="0";
			alert('请求失败：\r\n地址='+url+"\r\ntextStatus="+textStatus+"\r\nXMLHttpRequest.status="+XMLHttpRequest.status);
			if(func!=null&& func!=""){
				//回调函数
				eval(func+"(s_result)");
			}
		},
		success: function(result){
			s_result.result="1";
			s_result.datas=result;
			if(func!=null&& func!=""){
				//回调函数
				eval(func+'(s_result)');
			}
		}
	});	
}