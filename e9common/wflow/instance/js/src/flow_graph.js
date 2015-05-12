var g_img_path="../designer/";
var x_move_length=80; //查看流程图时，左移的位置大小
var jsonData_todo; //待办
var jsonData_do;   //已办
var json_num;
	
function g_init(evt){
	SVGDocument = evt.target.ownerDocument;
	SVGRoot = SVGDocument.documentElement;
	if(parent.$("#WF_FLOW_JSON_DATA")){
		if(parent.$("#WF_TODO_JSON_DATA").val()=='null'){
			parent.$("#WF_TODO_JSON_DATA").val('');
		}
		if(parent.$("#WF_DO_JSON_DATA").val()=='null'){
			parent.$("#WF_DO_JSON_DATA").val('');
		}
		
		jsonData_workflow=jQuery.parseJSON(parent.$("#WF_FLOW_JSON_DATA").val());
		$("#WF_TODO_JSON_DATA").val(parent.$("#WF_TODO_JSON_DATA").val());
		$("#WF_DO_JSON_DATA").val(parent.$("#WF_DO_JSON_DATA").val());
		$("#WF_FLOW_JSON_DATA").val(parent.$("#WF_FLOW_JSON_DATA").val());
	}else{
		jsonData_workflow=jQuery.parseJSON($("#WF_FLOW_JSON_DATA").val());
	}
	jsonData_todo=jQuery.parseJSON($("#WF_TODO_JSON_DATA").val()==""?"{}":$("#WF_TODO_JSON_DATA").val());
	jsonData_do=jQuery.parseJSON($("#WF_DO_JSON_DATA").val()==""?"{}":$("#WF_DO_JSON_DATA").val());
	if($("#WF_DO_JSON_DATA").val()=="" && $("#WF_TODO_JSON_DATA").val()==""){
		$("#id_td_do_html").hide();
	}
	
	drawGraph();
	
	json_num=jQuery.parseJSON('{}');
	
	//设置已办的流程轨迹
	setFlowDoTrack();
	
	//设置待办的流程轨迹
	setFlowTodoTrack();	
	
	//隐藏自动隐藏的操作结果
	setAutoHideOperater();
	$("#id_span_flow_name").html(jsonData_workflow.flowName+"("+jsonData_workflow.flowId+","+jsonData_workflow.flowVersion+")");
}

$(function(){
	$("#flow_graph_iframe").attr("src","wf_flow_graph.svg");
});

function g_mouseUp(evt){
	
}

/*
 * 选中的操作
 */
function operateButton(id){
	var num=2;
	if(id.indexOf('wf_c_3')>-1){
		num=3;
	}else if(id.indexOf('wf_c_4')>-1){
		num=4;
	}
	
	var v_find=0;
	if(num==2){
		setHide2show(id,num);
		//选择活动环节的
		var num=1;
		$("#id_td_do_html").html($("#id_span_do_table_model").html().replace("id_table_do_model","id_table_do").replace("span_model_activity_name","span_activity_name"));
		for(var i=(jsonData_do.length -1);i>=0;i--){	
			if(jsonData_do[i].ACTIVITY_ID==id){
				$("#span_activity_name").html(jsonData_do[i].ACTIVITY_NAME);
				
				var tr_title="操作时间："+jsonData_do[i].OPERATER_AT+"，发送人："+jsonData_do[i].CREATE_USER_NAME+"，发送时间："+jsonData_do[i].CREATE_AT;
				
				var tr_html="<tr title='"+tr_title+"'>";
				tr_html+="<td align='center'>";
				tr_html+=num+"</td><td>"+(jsonData_do[i].OPERATER_NAME==null?'[自动完成]':jsonData_do[i].OPERATER_NAME)+"</td><td>";
				tr_html+=jsonData_do[i].USER_NAME+"</td><td>"+(jsonData_do[i].OPINION?jsonData_do[i].OPINION:"")+"</td></tr>";	
				
				$("#id_table_do").append(tr_html);	
				v_find=1;
			}
			num++;
		}

		var a_find=0;
		if(v_find==1){
			$("#id_td_do_html").append("<br/>");
		}
		$("#id_td_do_html").append($("#id_span_todo_table_model").html().replace("id_table_todo_model","id_table_todo").replace("span_todo_model_activity_name","span_todo_activity_name"));
		for(var i=(jsonData_todo.length -1);i>=0;i--){	
			if(jsonData_todo[i].ACTIVITY_ID==id){
				$("#span_todo_activity_name").html(jsonData_todo[i].ACTIVITY_NAME);
				
				var tr_html="<tr>";
				tr_html+="<td align='center'>";
				tr_html+=jsonData_todo[i].SENDTO_NAME+"</td><td>";
				tr_html+=jsonData_todo[i].CREATE_USER_NAME+"</td><td>"+jsonData_todo[i].CREATE_AT+"</td></tr>";	
				
				$("#id_table_todo").append(tr_html);	
				a_find=1;
			}
		}
		if(a_find==0 && v_find==0){
			$("#id_td_do_html").html("&nbsp;");
		}
		if(a_find==0){
			$("#id_table_todo").hide();
		}
		if(v_find==0){
			$("#id_table_do").hide();
		}
	}
}

/*
 * 隐藏自动隐藏的操作结果
 */
function setAutoHideOperater(){
	//操作结果线关联的
	$.each(jsonData_operater,function(id,item){			
		if(item.isHide=="1"){
			SVGDocument.getElementById(id).setAttributeNS(null,"display", "none");
			SVGDocument.getElementById(id+"_line").setAttributeNS(null,"display", "none");
		}
	});
	$.each(jsonData_nextActivityLine,function(id,item){
		var obj="0";
		eval("obj=jsonData_operater."+item.operaterId+".isHide");
		if(obj=='1'){
			SVGDocument.getElementById(id).setAttributeNS(null,"display", "none");
			SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null,"display", "none");
			SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null,"display", "none");
			SVGDocument.getElementById("g_tmp_"+id+"_polyline").setAttributeNS(null,"display", "none");
		}
	});
}

/*
 * 设置待办的流程轨迹
 */
function setFlowTodoTrack(){
	for(var i=0;i<jsonData_todo.length;i++){
		setFlowTodoActivityTrack(jsonData_todo[i].ACTIVITY_ID,i);
	}
}

/*
 * 设置待办的流程活动环节轨迹
 */
function setFlowTodoActivityTrack(id,num){	
	var tmp_img = SVGDocument.createElementNS(xmlns, "image");
	tmp_img.href.baseVal = "img/arrowkk2.gif";
	tmp_img.setAttributeNS(null, "x", parseInt(SVGDocument.getElementById(id+"_img").getAttributeNS(null,"x")));
	tmp_img.setAttributeNS(null, "y", parseInt(SVGDocument.getElementById(id+"_img").getAttributeNS(null,"y")) -40);
	tmp_img.setAttributeNS(null, "height","30px");
	tmp_img.setAttributeNS(null, "width", "30px");
	tmp_img.setAttributeNS(null, "cursor", "pointer");
	tmp_img.setAttributeNS(null, "fill","white");
	SVGRoot.appendChild(tmp_img);
}

/*
 * 设置已办的流程轨迹
 */
function setFlowDoTrack(){
	var num=1;
	
	for(var i=(jsonData_do.length -1);i>=0;i--){
		if(num==1){
			operateButton(jsonData_do[i].ACTIVITY_ID);
		}
		setFlowDoActivityTrack(jsonData_do[i].ACTIVITY_ID,num);
		if(jsonData_do[i].OPERATER_ID){
			setFlowDoOperaterTrack(jsonData_do[i].OPERATER_ID,num);
		}
		num++;
	}
}	
/*
 * 设置已办的流程活动环节轨迹
 */
function setFlowDoActivityTrack(id,num){
	SVGDocument.getElementById(id+"_text").setAttributeNS(null,"stroke", "red");
	SVGDocument.getElementById(id+"_text").setAttributeNS(null,"font-size", "13");
	drawTextNum(id,num);	
}

/*
 * 设置已办的流程操作结果轨迹
 */
function setFlowDoOperaterTrack(id,num){
	SVGDocument.getElementById(id+"_img").setAttributeNS(null,"fill", "red");
	SVGDocument.getElementById(id+"_text").setAttributeNS(null,"stroke", "red");
	SVGDocument.getElementById(id+"_text").setAttributeNS(null,"font-size", "13");	
	SVGDocument.getElementById(id+"_line").setAttributeNS(null,"stroke", "red");
	setflowDoNextActivityLineTrack(id);
}

/*
 * 设置已办的流程后续线轨迹
 */
function setflowDoNextActivityLineTrack(operater_id){
	$.each(jsonData_nextActivityLine,function(id,item){		
		if(item.operaterId==operater_id){
			SVGDocument.getElementById(id+"_img").setAttributeNS(null,"stroke", "red");
			SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null,"stroke", "red");
			SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null,"stroke", "red");
			SVGDocument.getElementById("g_tmp_"+id+"_polyline").setAttributeNS(null,"stroke", "red");
		}
	});
}

/*
 * 画序列号
 */
function drawTextNum(id,text){
	var obj=null;
	eval("obj=json_num."+id);
	if(obj!=undefined){
		obj++;
	}else{
		obj=1;
	}
	eval("json_num."+id+"=obj");
	
	var x=parseInt(SVGDocument.getElementById(id+"_text").getAttributeNS(null,"x"));
	var y=parseInt(SVGDocument.getElementById(id+"_text").getAttributeNS(null,"y"));
	
	//画圆
	var tmp_circle = SVGDocument.createElementNS(xmlns, "circle");
	tmp_circle.setAttributeNS(null, "id", id+"_circle");
	tmp_circle.setAttributeNS(null, "cx", x+4 +(obj-1)*15);
	tmp_circle.setAttributeNS(null, "cy", y +10);
	tmp_circle.setAttributeNS(null, "r", 7);
	tmp_circle.setAttributeNS(null, "stroke", "#649BDC");
	tmp_circle.setAttributeNS(null, "stroke-width","1");
	tmp_circle.setAttributeNS(null, "fill","red");
	tmp_circle.setAttributeNS(null, "cursor", "pointer");
	SVGRoot.appendChild(tmp_circle);
	
	var tmp_text = SVGDocument.createElementNS(xmlns, "text");
	tmp_text.setAttributeNS(null,"font-size", "12");
	tmp_text.setAttributeNS(null,"font-family", "arial");
	tmp_text.setAttributeNS(null,"x", x +(text<10?0:-3) +(obj-1)*15);
	tmp_text.setAttributeNS(null,"y", y +14);
	tmp_text.setAttributeNS(null, "font-weight", "bold");
	tmp_text.textContent = text;
	tmp_text.setAttributeNS(null, "onselectstart","null");
	SVGRoot.appendChild(tmp_text);
}