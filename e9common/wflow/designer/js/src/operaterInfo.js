//显示隐藏table
function showTab(num){
	for(var i=1;i<=3;i++){
		$("#id_tab_"+i).hide();
		$('#id_a_tab_'+i).removeClass(); 
	}
	$("#id_tab_"+num).show();
	$('#id_a_tab_'+num).addClass("on"); 
	if(num==2){
		$("#id_tab_3").show();
	}
}
var wf_param_tr="<tr><td id='wf_paramName' style='word-wrap:break-word;max-width: 100px;'>x_paramName</td><td><input type='text' id='wf_paramValue' size='23' onchange='setParam()'/><br/>x_paramRemark</td></tr>";
var svg_id="";

function setParam(){
	var obj=parent.getOperaterJson(svg_id);
	obj.parameters=jQuery.parseJSON('{}');
	
	$.each($("td[id='wf_paramName']"),function(s_id){
		if($("input[id='wf_paramValue']").get(s_id).value!=''){
			var s_value=jQuery.parseJSON('{}');
			s_value.value=$("input[id='wf_paramValue']").get(s_id).value;
			var str="obj.parameters."+$(this).html()+"=s_value";
			eval(str);
		}
	});
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
}

/*
 * 断开与环节的连接
 */
function breakActivity(){
	var obj=parent.getOperaterJson(svg_id);
	obj.activityId="";
	parent.breakActivityFromOperater(svg_id);
}

/*
*设置结果环节相关属性
*/
function setProperty(){		
	var obj=parent.getOperaterJson(svg_id);
	
	$.each(parent.jsonData_workflow.operaterParameter,function(id,item){
		var str=wf_param_tr.replace("x_paramName",id);
		str=str.replace("x_paramRemark",item.remark);
		$('#id_tab_2').append(str);
	});
	if(!obj.parameters){
		obj.parameters=jQuery.parseJSON('{}');
	}
	$.each(obj.parameters,function(id,item){
		$.each($("td[id='wf_paramName']"),function(s_id){
			if($(this).html()==id){
				$("input[id='wf_paramValue']").get(s_id).value=item.value;
			}
		});
	});	
	
	obj.x=parent.getX2Y(svg_id,'_img','cx',1);
	obj.y=parent.getX2Y(svg_id,'_img','cy',1);

	//排序号
	if(!obj.listNo){
		obj.listNo="0";
	}
	$("#id_list_no").val(obj.listNo);
	
	//与环节的连接
	if(obj.activityId && obj.activityId!=""){
		$("#id_break_activity").show();
	}
	
	//是否中断
	if(!obj.isBreak){
		obj.isBreak="0";
	}
	$("#id_isBreak").val(obj.isBreak);
	if(obj.isBreak=="1"){
		$("#id_isBreak").attr("checked","checked");
	}
	
	//是否隐藏
	if(!obj.isHide){
		obj.isHide="0";
	}
	$("#id_isHide").val(obj.isHide);
	if(obj.isHide=="1"){
		$("#id_isHide").attr("checked","checked");
	}
	
	//意见必输
	if(!obj.opinion){
		obj.opinion="0";
	}
	$("#id_opinion").val(obj.opinion);
	if(obj.opinion=="1"){
		$("#id_opinion").attr("checked","checked");
	}
	//js函数
	if(!obj.jsFunc){
		obj.jsFunc="";
	}
	$("#id_js_func").val(obj.jsFunc);		

	$("#id_svg_object").attr("title","对象ID坐标：x="+obj.x+",y="+obj.y);

	//获取结果名称
	if(parent.SVGDocument.getElementById(svg_id+"_text")){
		$("#id_name").val(parent.SVGDocument.getElementById(svg_id+"_text").textContent);
		obj.name=$("#id_name").val();
	}
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
}
/*
*删除结果环节
*/
function delOperaterObj(){
	if(!confirm("确认删除该操作结果？")){
		return;
	}
	parent.delOperaterObj(svg_id);
}

/*
*结果名称修改
*/
function changeName(){
	//设置结果名称
	parent.SVGDocument.getElementById(svg_id+"_text").textContent = $('#id_name').val();
	var obj=parent.getOperaterJson(svg_id);

	//环节名称
	obj.name=$('#id_name').val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
	
	//居中显示名称
	parent.setOperaterNameLocation(obj.name,svg_id);		
}

/*
*更改排序号
*/
function changeListNo(){
	var obj=parent.getOperaterJson(svg_id);
	obj.listNo=$("#id_list_no").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
}
/*
*是否隐藏JS函数配置
*/
function changeJsFunc(){
	var obj=parent.getOperaterJson(svg_id);
	obj.jsFunc=$("#id_js_func").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
}

/*
*是否中断
*/
function changeBreak(){
	var obj=parent.getOperaterJson(svg_id);
	obj.isBreak=$("#id_isBreak").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
	//中断显示效果
	parent.setOperaterBreak(svg_id,obj.isBreak);		
}

/*
*是否隐藏
*/
function changeHide(){
	var obj=parent.getOperaterJson(svg_id);
	obj.isHide=$("#id_isHide").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));		
}

/*
*意见必输
*/
function changeOpinion(){
	var obj=parent.getOperaterJson(svg_id);
	obj.opinion=$("#id_opinion").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_operater));
}


$(function(){
	if(parent.$("#id_svg_obj").html()==''){
		parent.$("#property_iframe").attr("src","wf_flowInfo.html");
		return;
	}
	svg_id=parent.$("#id_svg_obj").html();
	$("#id_svg_object").html(svg_id);
	setProperty();		
	parent.setHide2show(svg_id,3);
});