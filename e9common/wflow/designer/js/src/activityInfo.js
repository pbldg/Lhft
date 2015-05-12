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

var svg_id="x";
var wf_param_tr="<tr><td id='wf_paramName' style='word-wrap:break-word;max-width: 100px;'>x_paramName</td><td style='word-wrap:break-word;'><input type='text' id='wf_paramValue' size='23' onchange='setParam()'/><br/>x_paramRemark</td></tr>";

function setParam(){
	var obj=parent.getActivityJson(svg_id);
	obj.parameters=jQuery.parseJSON('{}');
	
	$.each($("td[id='wf_paramName']"),function(s_id){
		if($("input[id='wf_paramValue']").get(s_id).value!=''){
			var s_value=jQuery.parseJSON('{}');
			s_value.value=$("input[id='wf_paramValue']").get(s_id).value;
			var str="obj.parameters."+$(this).html()+"=s_value";
			eval(str);
		}
	});
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}

/*
*设置活动环节相关属性
*/
function setProperty(){
	var obj=parent.getActivityJson(svg_id);
	
	$.each(parent.jsonData_workflow.activityParameter,function(id,item){
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
	
	obj.x=parent.getX2Y(svg_id,'_img','x',1);
	obj.y=parent.getX2Y(svg_id,'_img','y',1);

	//人员类型：任意一人、多人并行、多人顺序
	//环节类型：普通活动、开始活动、自动完成
	//人员范围：个人、部门、机关
	var tmp_data_json={"id_user_type":"userType","id_type":"type","id_user_scope":"userScope"};
	$.each(tmp_data_json,function(id,item){
		var tmp_obj=null;
		var str="tmp_obj=obj."+item;
		eval(str);
		if(tmp_obj){
			$("#"+id).val(tmp_obj);
			$("#"+id+"_"+tmp_obj).attr("checked","checked");
		}else{
			var s_tmp='0';
			if(item=='userType'){
				if(svg_id.indexOf('wf_c_0')>-1){
					s_tmp='0';
				}else if(svg_id.indexOf('wf_c_1')>-1){
					s_tmp='1';
				}else{
					s_tmp='2';
				}
			}
			$("#"+id).val(s_tmp);
			$("#"+id+"_"+s_tmp).attr("checked","checked");
			str="obj."+item+"='"+s_tmp+"'";
			eval(str);
		}
	});

	//排序号
	if(!obj.listNo){
		obj.listNo="0";
	}
	$("#id_list_no").val(obj.listNo);

	//权限代码
	if(!obj.userPower){
		obj.userPower="";
	}
	$("#id_user_power").val(obj.userPower);

	$("#id_svg_object").attr("title","对象ID坐标：x="+obj.x+",y="+obj.y);

	if(parent.SVGDocument.getElementById(svg_id+"_text")){
		//获取活动名称
		$("#id_name").val(parent.SVGDocument.getElementById(svg_id+"_text").textContent);
		obj.name=$("#id_name").val();
	}
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}
/*
*删除活动环节
*/
function delActivityObj(){
	if(!confirm("确认删除该活动环节？")){
		return;
	}
	parent.delActivityObj(svg_id);
}

/*
*活动名称修改
*/
function changeName(){
	//设置活动名称
	parent.SVGDocument.getElementById(svg_id+"_text").textContent = $('#id_name').val();
	var obj=parent.getActivityJson(svg_id);

	//环节名称
	obj.name=$('#id_name').val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
	
	//名称居中
	parent.setActivityNameLocation(obj.name,svg_id);
}

/*
*更改排序号
*/
function changeListNo(){
	var obj=parent.getActivityJson(svg_id);
	obj.listNo=$("#id_list_no").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}

/*
*更改权限代码
*/
function changeUserPower(){
	var obj=parent.getActivityJson(svg_id);
	obj.userPower=$("#id_user_power").val();
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}

/*
*更改环节类型
*/
function changeType(num){
	var obj=parent.getActivityJson(svg_id);
	if(obj.type==num){
		return;
	}
	obj.type=num;
	if(num=='2'){
		//自动完成
		parent.SVGDocument.getElementById(svg_id+"_img").href.baseVal = 'img/skin-'+parent.$("#id_flow_pic").val()+'/wf_d_0_a.png';
	}else if(num=='1'){
		//开始环节
		parent.SVGDocument.getElementById(svg_id+"_img").href.baseVal = 'img/skin-'+parent.$("#id_flow_pic").val()+'/wf_d_0_s.png';
		//去除有重复开始的，一个流程只有有一个开始环节
		$.each(parent.jsonData_activity,function(id,item){			
			if(id!=svg_id && item.type=='1'){
				item.type="0";
				parent.SVGDocument.getElementById(id+"_img").href.baseVal = 'img/skin-'+parent.$("#id_flow_pic").val()+'/wf_d_0.png';
			}
		});
		parent.jsonData_workflow.startActivityId=svg_id;
	}else{
		//普通环节
		parent.SVGDocument.getElementById(svg_id+"_img").href.baseVal = 'img/skin-'+parent.$("#id_flow_pic").val()+'/wf_d_0.png';
	}

	$("#id_user_type").val("0");
	$("#id_user_type_0").attr("checked","checked");
	obj.userType="0";
	
	//从开始环节变为其它的，去掉开始的标识
	if(parent.jsonData_workflow.startActivityId==svg_id && num!='1'){
		parent.jsonData_workflow.startActivityId="";
	}

	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}

/*
*更改人员类型
*/
function changeUserType(num){
	var obj=parent.getActivityJson(svg_id);
	if(obj.type!="0"){
		//只有普通环节的才能改
		$("#id_user_type").val("0");
		$("#id_user_type_0").attr("checked","checked");
		alert("环节类型不为【普通活动】时，不能进行更改！");
		return;
	}
	parent.SVGDocument.getElementById(svg_id+"_img").href.baseVal = 'img/skin-'+parent.$("#id_flow_pic").val()+'/wf_d_'+num+'.png';

	$("#id_user_type").val(num);
	obj.userType=num;
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}

/*
*改变人员范围
*/
function changeUserScope(num){
	var obj=parent.getActivityJson(svg_id);
	$("#id_user_scope").val(num);
	obj.userScope=num;
	$("#id_jsondata").val(JSON.stringify(parent.jsonData_activity));
}
/*
 * 页面加载时触发
 */
$(function(){
	if(parent.$("#id_svg_obj").html()==''){
		parent.$("#property_iframe").attr("src","wf_flowInfo.html");
		return;
	}
	svg_id=parent.$("#id_svg_obj").html();
	$("#id_svg_object").html(svg_id);
	setProperty();		
	parent.setHide2show(svg_id,2);
});