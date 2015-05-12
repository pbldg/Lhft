var g_img_path="";
var x_move_length=0; //查看流程图时，左移的位置大小

/*
 * 检查流程数据
 */
function checkFlow(){
	var s_msg="";
	
	//检查没有开始环节的
	if(jsonData_workflow.startActivityId==""){
		s_msg+="\r\n\r\n  ->没有配置流程开始环节；";
	}
	
	var a_msg="";
	//检查活动环节没有结果线的
	$.each(jsonData_activity,function(a_id,a_item){
		var i_find=0;
		$.each(jsonData_operater,function(id,item){
			if(item.activityId==a_id){
				i_find=1;
				return false;
			}
		});
		if(i_find==0){
			if(a_msg.indexOf('活动环节')<=-1){
				a_msg+="\r\n\r\n  ->活动环节：";
			}
			a_msg+="\r\n    ["+a_item.name+"]没有配置结果线；";
		}
	});
	s_msg+=a_msg;
	
	var i_find_operater=0;
	a_msg="";
	//检查结果线没有连接环节的
	$.each(jsonData_operater,function(id,item){
		if(!item.activityId || item.activityId==""){
			if(a_msg.indexOf('结果线')<=-1){
				a_msg+="\r\n\r\n  ->结果线：";
			}
			a_msg+="\r\n    ["+item.name+"]没有连接活动环节；";
		}
		var i_tmp=0;
		$.each(jsonData_nextActivityLine,function(n_id,n_item){	
			if(n_item.operaterId==id){
				i_tmp=1;
				return false;
			}
		});
		if(i_tmp==0 && i_find_operater==0){
			i_find_operater=1;
		}
	});
	if(i_find_operater==0){
		s_msg+="\r\n\r\n  ->没有配置结束的结果线；";
	}
	
	s_msg+=a_msg;
	
	a_msg="";
	//检查后续线没有连接结果线、活动环节的
	var s_1="\r\n\r\n  ->后续线：\r\n    存在没有连接结果线；";
	var s_2="\r\n\r\n  ->后续线：\r\n    存在没有连接活动环节；";
	$.each(jsonData_nextActivityLine,function(id,item){		
		if((!item.operaterId || item.operaterId=="") && a_msg.indexOf(s_1)<=-1){
			a_msg+=s_1;
		}
		if((!item.activityId || item.activityId=="") && a_msg.indexOf(s_2)<=-1){
			a_msg+=s_2;
		}
		if(a_msg.indexOf('存在没有连接结果线')>-1 && a_msg.indexOf('存在没有连接活动环节')>-1){
			return false;
		}
	});
	s_msg+=a_msg;
	
	if(s_msg!=''){
		s_msg="流程以下条件不满足："+s_msg;
	}
	return s_msg;
}

/*
*遮罩层
*/
function show2HideDiv(flag){   
    if(flag==1){
    	$("#div_bg").show();
    	$("#div_show").show();
    	$("#div_bg_title").show();
    }else{
    	$("#div_bg").hide();
    	$("#div_show").hide();
    	$("#div_bg_title").hide();
    	if($("#property_iframe").attr("src").indexOf('wf_flowInfo.html')>-1){
    		property_iframe.location.reload();	
    	}
    }
}

/*
*变换流程的图标集
*/
function changeFlowPic(flag){
	var s_type=$("#id_flow_pic").val();
	if(flag==2){
		s_type=jsonData_workflow.picNum;
	}
	//图标集
	if($("#id_flow_pic").val()!=jsonData_workflow.picNum){
		for(var i=0;i<=4;i++){
			SVGDocument.getElementById('wf_d_img_'+i).href.baseVal="img/skin-"+s_type+"/"+'wf_d_'+i+".png";
		}
		//改变活动环节的图标
		$.each(jsonData_activity,function(id,item){
			var s_img_url=SVGDocument.getElementById(id+"_img").href.baseVal;
			if(flag==2){
				s_img_url=s_img_url.replace('skin-'+$("#id_flow_pic").val(),'skin-'+jsonData_workflow.picNum);
			}else{
				s_img_url=s_img_url.replace('skin-'+jsonData_workflow.picNum,'skin-'+$("#id_flow_pic").val());
			}
			
			SVGDocument.getElementById(id+"_img").href.baseVal=s_img_url;			
		});	
		if(flag==2){
			$("#id_flow_pic").val(jsonData_workflow.picNum);
		}else{
			jsonData_workflow.picNum=$("#id_flow_pic").val();
		}	
	}
}


$(function(){
	var v_json=$("#id_textarea_json",parent.document).val();
	if(v_json && v_json!=undefined){
		//流程信息
		jsonData_workflow=jQuery.parseJSON($("#id_textarea_json",parent.document).val());
	}else{
		//流程信息
		jsonData_workflow=jQuery.parseJSON('{"createNum":"0","picNum":"0","startActivityId":"","flowId":"流程标识ID","flowName":"流程名称","flowVersion":"流程版本1.0","activity":{},"operater":{},"nextActivityLine":{}}');	
	}
	
	//加载图标集
	for( var i=0;i<g_pic_num;i++){
		$("#id_flow_pic").append("<option value='"+i+"'>图标集-"+i+"</option>");
	}
	$("#svg_iframe").attr("src","wf_context.svg");	
});

/*
*清空画板
*/
function  resetSvgData(){
	if(confirm("确认清空流程图吗？")){		
		$.each(jsonData_nextActivityLine,function(id,item){
			delNextActivityLineObj(id);
		});
		$.each(jsonData_operater,function(id,item){
			delOperaterObj(id);
		});
		$.each(jsonData_activity,function(id,item){
			delActivityObj(id);
		});
		
		//活动环节
		jsonData_activity=jQuery.parseJSON('{}');
		//操作结果
		jsonData_operater=jQuery.parseJSON('{}');
		//后续线
		jsonData_nextActivityLine=jQuery.parseJSON('{}');	
		//流程信息
		jsonData_workflow=jQuery.parseJSON('{"createNum":"0","startActivityId":"","flowId":"流程标识ID","flowName":"流程名称","flowVersion":"流程版本1.0"}');	
		
		jsonData_workflow.picNum=$("#id_flow_pic").val();;
		
		g_create_num=0;
		
		jsonData_workflow.activity=jsonData_activity;
		jsonData_workflow.operater=jsonData_operater;
		jsonData_workflow.nextActivityLine=jsonData_nextActivityLine;
		
		window.frames["property_iframe"].onbeforeunload = function(){};		
		$("#property_iframe").attr("src","wf_flowInfo.html");
	}
}

/*
*创建对象的顺序号
*/
function getCreateNum(){
	g_create_num++;
	jsonData_workflow.createNum=g_create_num+'';
	return g_create_num;
}

/*
*初始变量值
*/
function setInit(obj){
	SVGDocument=obj;
	SVGRoot=obj.documentElement;
	changeFlowPic(1);
	drawGraph();
	$("#id_table_iframe").show();
}

/*
*设置线的连接，设置坐标点(x,y)
*/
function setLineXY(svg_id,evt){
	if(svg_id.indexOf('_line_n_1')>-1){
		//后续线的，连接操作结果的
		var obj=getNextActivityLineJson(svg_id.replace('_line_n_1',''));
		if(obj.operaterId){
			return;
		}
		SVGDocument.getElementById('g_tmp_text_0').textContent=svg_id;
		//查找是不是落在活动环节的图标上
		$.each(jsonData_operater,function(id,item){
			if(item==null){
				return;
			}
			if(parseInt(evt.clientX)>=(parseInt(item.x)-15) && parseInt(evt.clientX)<= (parseInt(item.x)+15) && (parseInt(evt.clientY)+parseInt(getScrollTop()))>=(parseInt(item.y)-15) && (parseInt(evt.clientY)+parseInt(getScrollTop()))<= (parseInt(item.y)+15)){
				//改变连接上后效果
				setNextActivityLineLinkLine1(svg_id,item.x,item.y);
				obj.operaterId=id;						
				return false;
			}
		});			
	}else if(svg_id.indexOf('_line_n_2')>-1){
		//后续线的，连接活动环节的
		var obj=getNextActivityLineJson(svg_id.replace('_line_n_2',''));
		if(obj.activityId){
			return;
		}
		SVGDocument.getElementById('g_tmp_text_0').textContent=svg_id;
		//查找是不是落在活动环节的图标上
		$.each(jsonData_activity,function(id,item){
			if(item==null){
				return;
			}
			if(parseInt(evt.clientX)>=parseInt(item.x) && parseInt(evt.clientX)<= (parseInt(item.x)+32) && (parseInt(evt.clientY)+parseInt(getScrollTop()))>=parseInt(item.y) && (parseInt(evt.clientY)+parseInt(getScrollTop()))<= (parseInt(item.y)+32)){
				//改变连接上后效果
				setNextActivityLineLinkLine2(svg_id,item.x,item.y);
				obj.activityId=id;					
				return false;
			}
		});	
	}else{
		//操作结果线，连接活动环节的
		var obj=getOperaterJson(svg_id.replace('_line',''));
		if(obj.activityId){
			return;
		}
		//查找是不是落在活动环节的图标上
		$.each(jsonData_activity,function(id,item){
			if(item==null){
				return;
			}
			if(parseInt(evt.clientX )>=parseInt(item.x) && parseInt(evt.clientX )<= (parseInt(item.x)+32) && (parseInt(evt.clientY)+parseInt(getScrollTop()))>=parseInt(item.y) && (parseInt(evt.clientY)+parseInt(getScrollTop()))<= (parseInt(item.y)+32)){
				//改变连接上后效果
				setOperaterLinkLine(svg_id,item.x,item.y);
				obj.activityId=id;					
				return false;
			}
		});
	}
}

/*
*检查结果线是否连上了活动环节
*/
function checkOperaterLine(svg_id){
	var obj=getOperaterJson(svg_id);
	if(obj.activityId){
		return true;
	}
	return false;
}

/*
*检查后续线是不是在活动环节或操作结果上的连接线
*/
function checkNextActivityLine(svg_id){		
	var str='_line_n_1';
	if(svg_id.indexOf('_line_n_2')>-1){
		str='_line_n_2';
	}
	var obj=getNextActivityLineJson(svg_id.replace(str,''));
	if((str=='_line_n_2' && obj.activityId) || (str=='_line_n_1' && obj.operaterId)){
		return true;
	}
	return false;
}

/*
*拖动结果线带动连接上面的相关线条
*/
function setOperaterLine(svg_id){
	//alert(svg_id);
	//后续线的
	$.each(jsonData_nextActivityLine,function(id,item){
		if(item.operaterId==svg_id){
			SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null, 'x2',parseInt(getX2Y(svg_id,'_img','cx',1)));
			SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null, 'y2',parseInt(getX2Y(svg_id,'_img','cy',1)));
			
			//箭头跟转
			setNextActivityLineArrowEffect(id+"_line_n_1");
		}
	});
}

/*
*拖动活动环节带动连接上面的相关线条
*/
function setActivityLine(svg_id){
	//操作结果线的
	$.each(jsonData_operater,function(id,item){
		if(item.activityId==svg_id){
			SVGDocument.getElementById(id+"_line").setAttributeNS(null, 'x2',parseInt(getX2Y(svg_id,'_img','x',1))+img_width_height/2);
			SVGDocument.getElementById(id+"_line").setAttributeNS(null, 'y2',parseInt(getX2Y(svg_id,'_img','y',1))+img_width_height/2);
		}
	});
	//后续线的
	$.each(jsonData_nextActivityLine,function(id,item){
		if(item.activityId==svg_id){
			SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null, 'x2',parseInt(getX2Y(svg_id,'_img','x',1))+img_width_height/2);
			SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null, 'y2',parseInt(getX2Y(svg_id,'_img','y',1))+img_width_height/2);
		}
	});
}
/*
*删除活动节点、后续线、结果线
*/
function delSvgObj(svg_id){
	if(svg_id==''){
		return;
	}
	//删除时需要去除各属性的onbeforeunload事件，避免再次触发
	window.frames["property_iframe"].onbeforeunload = function(){};
	
	SVGRoot.removeChild(SVGDocument.getElementById(svg_id));
	//去除选中框
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"display","none");
	clearData();	
}

/*
*活动、操作结果、后续线的svg调用事件
*/
function operateButton(svg_id){
	//$(window.frames["property_iframe"].document).find("#id_svg_obj").html(svg_id);
	$("#id_svg_obj").html(svg_id);
	if(svg_id.indexOf("wf_c_0")>-1 || svg_id.indexOf("wf_c_1")>-1 || svg_id.indexOf("wf_c_2")>-1){
		//环节的图标
		$("#property_iframe").attr("src","wf_activityInfo.html");
		return;						
	}else if(svg_id.indexOf("wf_c_3")>-1){
		//操作结果的图标
		$("#property_iframe").attr("src","wf_operaterInfo.html");
		return;
	}else if(svg_id.indexOf("wf_c_4")>-1){
		//后续线的图标
		$("#property_iframe").attr("src","wf_nextActivityLineInfo.html");
		return;
	}		
}

/*
*清属性的数据
*/
function clearData(){
	if($("#property_iframe").attr("src").indexOf("wf_flowInfo.html")<=-1){
		$("#property_iframe").attr("src","wf_flowInfo.html");
		SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"display","none");
	}		
}

/*
*取坐标 flag=1取绝对坐标，其它取相对坐标
*/
function getX2Y(id,affixStr,param,flag){
	var transform=SVGDocument.getElementById(id).getAttributeNS(null,'transform');
	if(transform && transform.indexOf('translate')>-1){
		transform=transform.replace('translate(','').replace(')','').replace(",",' ');
		if(param.indexOf('x')>-1){
			return (parseInt(transform.split(' ')[0]) +(flag==1?parseInt(SVGDocument.getElementById(id+affixStr).getAttributeNS(null,param)):0)).toString();
		}else{
			if(transform.split(' ').length==2){
				return (parseInt(transform.split(' ')[1]) +(flag==1?parseInt(SVGDocument.getElementById(id+affixStr).getAttributeNS(null,param)):0)).toString();
			}else{
				return (flag==1?parseInt(SVGDocument.getElementById(id+affixStr).getAttributeNS(null,param)):0).toString();
			}				
		}
	}else{
		SVGDocument.getElementById("g_tmp_text_0").textContent ="11";
		return SVGDocument.getElementById(id+affixStr).getAttributeNS(null,param);
	}
}

/*
*根据json数据画流程图
*/
function reDrawWorkFlowGraph(){	
	$.each(jsonData_nextActivityLine,function(id,item){
		delNextActivityLineObj(id);
	});
	$.each(jsonData_operater,function(id,item){
		delOperaterObj(id);
	});
	$.each(jsonData_activity,function(id,item){
		delActivityObj(id);
	});
	var str="jsonData_workflow="+window.frames["div_iframe"].jsoninput.jvalue.value;
	//重新赋新值
	eval(str);
	drawGraph();
}

/*
 * 操作结果断开活动环节
 */
function breakActivityFromOperater(id){
	SVGDocument.getElementById(id+"_line").setAttributeNS(null, "stroke-width","4");
	SVGDocument.getElementById(id+"_line").setAttributeNS(null, 'pointer-events', 'all');
	SVGDocument.getElementById(id+"_line").setAttributeNS(null, "x2",parseInt(getX2Y(id,"_img",'cx',1)) -16);
	SVGDocument.getElementById(id+"_line").setAttributeNS(null, "y2",getX2Y(id,"_img",'cy',1));
}

/*
 * 后续线断开活动环节
 */
function breakActivityFromNextActivityLine(id){
	SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null, "stroke-width","4");
	SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null, 'pointer-events', 'all');
	SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null, "x2",parseInt(getX2Y(id,"_img",'cx',1)) +15);
	SVGDocument.getElementById(id+"_line_n_2").setAttributeNS(null, "y2",parseInt(getX2Y(id,"_img",'cy',1)) +15);
}

/*
 * 后续线断开结果线
 */
function breakOperaterFromNextActivityLine(id){
	SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null, "stroke-width","4");
	SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null, 'pointer-events', 'all');
	SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null, "x2",parseInt(getX2Y(id,"_img",'cx',1)) +15);
	SVGDocument.getElementById(id+"_line_n_1").setAttributeNS(null, "y2",parseInt(getX2Y(id,"_img",'cy',1)) -15);
}

/*
*删除活动环节
*/
function delActivityObj(svg_id){
	delSvgObj(svg_id);
	//活动环节的
		
	//操作结果线关联的
	$.each(jsonData_operater,function(id,item){
		if(item.activityId==svg_id){
			breakActivityFromOperater(id);
			delete item.activityId;
		}
	});
	//后续线的
	$.each(jsonData_nextActivityLine,function(id,item){
		if(item.activityId==svg_id){
			breakActivityFromNextActivityLine(id);
			delete item.activityId;
		}
		
		if(item.defaultUserActivityId==svg_id){
			item.defaultUserActivityId=''; //指定活动
			item.defaultUser='';//默认用户
		}
		
	});
	var str="delete jsonData_activity."+svg_id;
	eval(str);
}
/*
*删除结果环节
*/
function delNextActivityLineObj(svg_id){
	delSvgObj(svg_id);
	//设置后续线	
	SVGRoot.removeChild(SVGDocument.getElementById("g_tmp_"+svg_id+"_polyline"));
	SVGRoot.removeChild(SVGDocument.getElementById(svg_id+"_line_n_1"));
	SVGRoot.removeChild(SVGDocument.getElementById(svg_id+"_line_n_2"));
	var str="delete jsonData_nextActivityLine."+svg_id;
	eval(str);
}
/*
*删除结果环节
*/
function delOperaterObj(svg_id){
	delSvgObj(svg_id);

	//设置操作结果
	SVGRoot.removeChild(SVGDocument.getElementById(svg_id+"_line"));
	//后续线的
	$.each(jsonData_nextActivityLine,function(id,item){
		if(item.operaterId==svg_id){
			breakOperaterFromNextActivityLine(id);
			delete item.operaterId;
		}
	});
	var str="delete jsonData_operater."+svg_id;
	eval(str);	
}

/*
 * 页面离开时触发
 */
function saveFormData(){
	$.each($(window.frames["property_iframe"].document).find("input[type='text']"),function(id){
		$(this).trigger("change");
	});
}

