var svg_id="";

/*
*设置结果环节相关属性
*/
function setProperty(){		
	var obj=parent.getNextActivityLineJson(svg_id);
	obj.x=parent.getX2Y(svg_id,'_img','cx',1);
	obj.y=parent.getX2Y(svg_id,'_img','cy',1);

	//触发顺序
	if(!obj.triggerListNo){
		obj.triggerListNo="0";
	}
	$("#id_trigger_list_no").val(obj.triggerListNo);
	
	//排序号
	if(!obj.listNo){
		obj.listNo="0";
	}
	$("#id_list_no").val(obj.listNo);
		
	//执行与否不影响其他活动
	if(!obj.effect){
		obj.effect="0";
	}
	$("#id_effect").val(obj.effect);
	if(obj.effect=="1"){
		$("#id_effect").attr("checked","checked");
	}
	//与结果线的连接
	if(obj.operaterId && obj.operaterId!=""){
		$("#id_break_operater").show();
	}
	//与环节的连接
	if(obj.activityId && obj.activityId!=""){
		$("#id_break_activity").show();
	}
	
	//默认用户
	if(!obj.defaultUser){
		obj.defaultUser="";
	}
	$("#id_default_user").val(obj.defaultUser);
	
	//指定活动
	if(!obj.defaultUserActivityId){
		obj.defaultUserActivityId="";
	}
	if(obj.defaultUserActivityId!=''){
		//去除后，再重新加载
		$('#id_default_user_activity_id option').remove();		
		//活动环节的选择
		$.each(parent.jsonData_activity,function(id,item){
			$("#id_default_user_activity_id").append('<option value="'+id+'">'+item.name+'['+id+']'+'</option>');
		});	
		$("#id_default_user_activity_id").val(obj.defaultUserActivityId);
		$("#id_tr_default_user_activity_id").show();
	}		
	
	$("#id_svg_object").attr("title","对象ID坐标：x="+obj.x+",y="+obj.y);
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_nextActivityLine));
}

/*
 * 断开与结果线的连接
 */
function breakOperater(){
	var obj=parent.getNextActivityLineJson(svg_id);
	parent.breakOperaterFromNextActivityLine(svg_id);
	obj.operaterId="";	
}

/*
 * 断开与环节的连接
 */
function breakActivity(){
	var obj=parent.getNextActivityLineJson(svg_id);
	parent.breakActivityFromNextActivityLine(svg_id);
	obj.activityId="";
}

/*
*删除结果环节
*/
function delNextActivityLineObj(){
	if(!confirm("确认删除该后续线？")){
		return;
	}
	parent.delNextActivityLineObj(svg_id);
}

/*
*更改排序号
*/
function changeListNo(){
	var obj=parent.getNextActivityLineJson(svg_id);
	obj.listNo=$("#id_list_no").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_nextActivityLine));
}

/*
*更改触发顺序
*/
function changeTriggerListNo(){
	var obj=parent.getNextActivityLineJson(svg_id);
	obj.triggerListNo=$("#id_trigger_list_no").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_nextActivityLine));
	
	//设置后续线的触发顺序效果
	parent.setNextActivityLine(svg_id,obj.triggerListNo,obj.effect);
}

/*
*执行与否不影响其他活动
*/
function changeEffect(){
	var obj=parent.getNextActivityLineJson(svg_id);
	obj.effect=$("#id_effect").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_nextActivityLine));
	
	//设置后续线的执行与否不影响其他活动效果
	parent.setNextActivityLine(svg_id,obj.triggerListNo,obj.effect);
}

/*
*提定活动
*/
function changeDefaultUserActivityId(val){
	var obj=parent.getNextActivityLineJson(svg_id);
	obj.defaultUserActivityId=val;
}

/*
*默认用户
*/
function changeDefaultUser(val){
	var obj=parent.getNextActivityLineJson(svg_id);
	obj.defaultUserActivityId='';
	$('#id_default_user_activity_id').val('');
	
	if(val==''){
		obj.defaultUser='';
		$('#id_tr_default_user_activity_id').hide();
		return;
	}
	
	//当前用户
	if(val=='0'){
		obj.defaultUser='0';
		$('#id_tr_default_user_activity_id').hide();
		return;
	}
	
	//指定活动首用户1 指定活动末用户2 同组活动的用户3
	if(val=='1' || val=='2' || val=='3'){
		obj.defaultUser=val;
		$('#id_tr_default_user_activity_id').show();
	}
	
	//去除后，再重新加载
	$('#id_default_user_activity_id option').remove();		
	//活动环节的选择
	$.each(parent.jsonData_activity,function(id,item){
		$("#id_default_user_activity_id").append('<option value="'+id+'">'+item.name+'</option>');
	});	
	obj.defaultUserActivityId=$('#id_default_user_activity_id').val();		
}

$(function(){
	if(parent.$("#id_svg_obj").html()==''){
		parent.$("#property_iframe").attr("src","wf_flowInfo.html");
		return;
	}
	svg_id=parent.$("#id_svg_obj").html();
	$("#id_svg_object").html(svg_id);
	setProperty();		
	parent.setHide2show(svg_id,4);
});