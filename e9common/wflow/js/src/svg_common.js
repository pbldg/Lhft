//活动环节
var jsonData_activity={};
//操作结果
var jsonData_operater={};
//后续线
var jsonData_nextActivityLine={};	
//流程信息
var jsonData_workflow;	

var g_create_num=0;
var SVGDocument;
var SVGRoot;
var xmlns = "http://www.w3.org/2000/svg";
var xmlLink="http://www.w3.org/1999/xlink";

var img_width_height=32;//图片宽、高度

var svg_max_x=0;
var svg_max_y=0;
/**
 * 取滚动条高度
 * @returns
 */
function getScrollTop(){
	if($("#svg_iframe").contents().scrollTop()==null){
		return 0;
	}
	return $("#svg_iframe").contents().scrollTop();
}

function getScrollLeft(){
	if($("#svg_iframe").contents().scrollLeft()==null){
		return 0;
	}
	return $("#svg_iframe").contents().scrollLeft();
}
/*
*设置SVG画布的高度
*/
function setHeight(height){
	if((height.toString()).indexOf('%')>-1 || (height +100)>$(window).height()){
		SVGRoot.setAttributeNS(null, 'height', height);
		SVGRoot.style.height=height;
	}
}

/*
*设置SVG画布的宽度
*/
function setWidth(width){
	if((width.toString()).indexOf('%')>-1 || (width +200)>$(window).width()){
		SVGRoot.setAttributeNS(null, 'width', width);
		SVGRoot.style.width=width;
	}	
}


function getSvgMaxHeightAndWidth(x,y){
	if(parseInt(x) > svg_max_x ){
		svg_max_x =parseInt(x);
	}
	if(parseInt(y) > svg_max_y){
		svg_max_y = parseInt(y);
	}
}

/*
*根据json数据画流程图
*/
function drawGraph(){
	if(jsonData_workflow==null || !jsonData_workflow.createNum){
		return;
	}
	//活动环节
	jsonData_activity=jsonData_workflow.activity;
	//操作结果
	jsonData_operater=jsonData_workflow.operater;
	//后续线
	jsonData_nextActivityLine=jsonData_workflow.nextActivityLine;		
	//创建的对象顺序号
	g_create_num=jsonData_workflow.createNum;
	
	var str;	
	
	//后续线的
	$.each(jsonData_nextActivityLine,function(id,item){
		getSvgMaxHeightAndWidth(item.x,item.y);
		
		createNextActivityLineGraph(id,(parseInt(item.x) -x_move_length),item.y);
		
		//活动环节的连接
		if(item.activityId && item.activityId!=''){
			var x=0,y=0;			
			str="x=jsonData_activity."+item.activityId+".x";
			eval(str);
			str="y=jsonData_activity."+item.activityId+".y";
			eval(str);
			setNextActivityLineLinkLine2(id+"_line_n_2",(parseInt(x) -x_move_length),y);
		}
		
		//操作结果的连接
		if(item.operaterId && item.operaterId!=''){
			var x=0,y=0;
			str="x=jsonData_operater."+item.operaterId+".x";
			eval(str);
			str="y=jsonData_operater."+item.operaterId+".y";
			eval(str);
			setNextActivityLineLinkLine1(id+"_line_n_1",(parseInt(x) -x_move_length),y);
		}
		//设置后续线的【触发顺序、执行与否不影响其他活动】效果
		setNextActivityLine(id,item.triggerListNo,item.effect);
		
		//箭头的连接跟转
		setNextActivityLineArrowEffect(id+"_line_n_1");
		
	});
	
	//操作结果线关联的
	$.each(jsonData_operater,function(id,item){			
		getSvgMaxHeightAndWidth(item.x,item.y);
		
		createOperaterGraph(id,(parseInt(item.x) -x_move_length),item.y,item.name);	
		//连接活动环节的连线
		if(item.activityId && item.activityId!=''){
			var x=0,y=0;
			str="x=jsonData_activity."+item.activityId+".x";
			eval(str);
			str="y=jsonData_activity."+item.activityId+".y";
			eval(str);
			setOperaterLinkLine(id+"_line",(parseInt(x) -x_move_length),y);
		}
		//操作结果的中断效果
		setOperaterBreak(id,item.isBreak);
		
		if(item && item.parameters && item.parameters.WF_INSTANCE_ISEND && item.parameters.WF_INSTANCE_ISEND != undefined && item.parameters.WF_INSTANCE_ISEND!="undefined"){
			setOperaterFinish(id,item.parameters.WF_INSTANCE_ISEND.value);
		}
		//
		//名称居中
		setOperaterNameLocation(item.name,id);
	});
	
	//活动环节的
	$.each(jsonData_activity,function(id,item){
		getSvgMaxHeightAndWidth(item.x,item.y);
		
		createActivityGraph(id,(parseInt(item.x) -x_move_length),item.y,item.name,item.userType,item.type);
		//名称居中
		setActivityNameLocation(item.name,id);
	});
	
	if($("#id_flow_pic").val()!=undefined){
		if($("#id_flow_pic").val()!=jsonData_workflow.picNum){
			//改变图标集
			changeFlowPic(2);
		}
		window.frames["property_iframe"].onbeforeunload = function(){};
		$("#property_iframe").attr("src","wf_flowInfo.html");
	}
	if(svg_max_y!=0){
		setHeight(svg_max_y +40);
		setWidth(svg_max_x +20);
	}	
}
/*
*获取中英文的长度，中文算两个长度
*/
function getStringLength(str){
	var len= str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;
	return len;
}

/*
*画图共有的部份
*/
function createCommonGraph(id){	
	var tmp_g = SVGDocument.createElementNS(xmlns, "g");
	tmp_g.setAttributeNS(null,"id", id);
	tmp_g.setAttributeNS(null,"cursor", "pointer");
	var str="parent.operateButton('"+id+"');";
	tmp_g.setAttributeNS(null,"onclick", str);
	return tmp_g;
}

/*
*画后续线
*/
function createNextActivityLineGraph(id,x,y){
	y = parseInt(y) + parseInt(getScrollTop());
	//先画线
	var tmp_g=createCommonGraph(id);
	
	//画箭头
	var tmp_polyline = SVGDocument.createElementNS(xmlns, "polyline");
	tmp_polyline.setAttributeNS(null, "id", "g_tmp_"+id+"_polyline");
	tmp_polyline.setAttributeNS(null, "fill", "white");
	tmp_polyline.setAttributeNS(null, "stroke", "#649BDC");
	tmp_polyline.setAttributeNS(null, "stroke-width", "1");	
	SVGRoot.insertBefore(tmp_polyline, SVGRoot.firstChild);//放置最底层
	
	
	//画线--上半部分
	var tmp_line = SVGDocument.createElementNS(xmlns, "line");
	tmp_line.setAttributeNS(null, "id", id+"_line_n_1");
	tmp_line.setAttributeNS(null, "x1", x);
	tmp_line.setAttributeNS(null, "y1", y);
	tmp_line.setAttributeNS(null, "x2", parseInt(x) +15);
	tmp_line.setAttributeNS(null, "y2",parseInt(y) -15);	
	tmp_line.setAttributeNS(null, "cursor", "pointer");
	tmp_line.setAttributeNS(null, "stroke-width","3");
	tmp_line.setAttributeNS(null, "stroke-linecap","round");
	SVGRoot.insertBefore(tmp_line, SVGRoot.firstChild);//放置最底层
	
	//画线--下半部分
	tmp_line = SVGDocument.createElementNS(xmlns, "line");
	tmp_line.setAttributeNS(null, "id", id+"_line_n_2");			
	tmp_line.setAttributeNS(null, "x1", x);
	tmp_line.setAttributeNS(null, "y1", y);
	tmp_line.setAttributeNS(null, "x2", parseInt(x) +15);
	tmp_line.setAttributeNS(null, "y2",parseInt(y) +15);		
	tmp_line.setAttributeNS(null, "cursor", "pointer");
	tmp_line.setAttributeNS(null, "stroke-width","3");
	tmp_line.setAttributeNS(null, "stroke-linecap","round");
	SVGRoot.insertBefore(tmp_line, SVGRoot.firstChild);//放置最底层
	
	//画圆	
	var tmp_circle = SVGDocument.createElementNS(xmlns, "circle");
	tmp_circle.setAttributeNS(null, "id", id+"_img");
	tmp_circle.setAttributeNS(null, "cx",  x);
	tmp_circle.setAttributeNS(null, "cy", y);
	tmp_circle.setAttributeNS(null, "r", 3);
	//tmp_circle.setAttributeNS(null, "display", "");
	tmp_circle.setAttributeNS(null, "stroke", "#649BDC");
	tmp_circle.setAttributeNS(null, "stroke-width","1");
	tmp_circle.setAttributeNS(null, "fill","white");
	tmp_circle.setAttributeNS(null, "cursor", "pointer");
	tmp_g.appendChild(tmp_circle);		
	SVGRoot.appendChild(tmp_g);
	
	
	//箭头跟转
	setNextActivityLineArrowEffect(id+"_line_n_1");
	
	//初始后续线效果
	setNextActivityLine_n(id,'0');
	
	return tmp_g;
}

/*
*画活动环节
*/
function createActivityGraph(id,x,y,name,userType,type){
	y = parseInt(y) + parseInt(getScrollTop());
	//创建活动环节
	var tmp_g=createCommonGraph(id);
	var tmp_img = SVGDocument.createElementNS(xmlns, "image");
	tmp_img.setAttributeNS(null, "id", id+"_img");
	tmp_img.href.baseVal = g_img_path+'img/skin-0/wf_d_'+(type=='1'?'0_s':(type=='2'?'0_a':userType))+'.png';
	tmp_img.setAttributeNS(null, "x", x );
	tmp_img.setAttributeNS(null, "y", y);
	tmp_img.setAttributeNS(null, "height", img_width_height+"px");
	tmp_img.setAttributeNS(null, "width", img_width_height+"px");
	tmp_img.setAttributeNS(null, "cursor", "pointer");
	tmp_img.setAttributeNS(null, "fill","white");
	tmp_g.appendChild(tmp_img);

	var tmp_text = SVGDocument.createElementNS(xmlns, "text");
	tmp_text.setAttributeNS(null, "id", id+"_text");
	tmp_text.setAttributeNS(null,"font-size", "12");
	tmp_text.setAttributeNS(null,"font-family", "arial");
	tmp_text.setAttributeNS(null,"x", parseInt(x) -8);
	tmp_text.setAttributeNS(null,"y", parseInt(y) -5 );
	tmp_text.setAttributeNS(null, "font-weight", "bold");
	tmp_text.textContent = name;
	tmp_text.setAttributeNS(null, "onselectstart","null");
	tmp_g.appendChild(tmp_text);
	
	SVGRoot.appendChild(tmp_g);
	return tmp_g;
}

/*
*画操作结果线
*/
function createOperaterGraph(id,x,y,name){
	y = parseInt(y) + parseInt(getScrollTop());
	//创建结果线			
	var tmp_g=createCommonGraph(id);
	
	//先画线
	var tmp_line = SVGDocument.createElementNS(xmlns, "line");
	tmp_line.setAttributeNS(null, "id", id+"_line");
	tmp_line.setAttributeNS(null, "x1", x );
	tmp_line.setAttributeNS(null, "y1", y);
	tmp_line.setAttributeNS(null, "x2", x -16);
	tmp_line.setAttributeNS(null, "y2",y);	
	tmp_line.setAttributeNS(null, "stroke", "#649BDC");			
	tmp_line.setAttributeNS(null, "stroke-width","4");
	tmp_line.setAttributeNS(null, "stroke-linecap","round");
	tmp_line.setAttributeNS(null, "cursor", "pointer");
	SVGRoot.insertBefore(tmp_line, SVGRoot.firstChild);//放置最底层
	
	//画圆
	var tmp_circle = SVGDocument.createElementNS(xmlns, "circle");
	tmp_circle.setAttributeNS(null, "id", id+"_img");
	tmp_circle.setAttributeNS(null, "cx",  x);
	tmp_circle.setAttributeNS(null, "cy", y);
	tmp_circle.setAttributeNS(null, "r", 8);
	tmp_circle.setAttributeNS(null, "stroke", "#649BDC");
	tmp_circle.setAttributeNS(null, "stroke-width","1");
	tmp_circle.setAttributeNS(null, "fill","#C3D9FF");
	tmp_circle.setAttributeNS(null, "cursor", "pointer");
	tmp_g.appendChild(tmp_circle);

	//文字
	var tmp_text = SVGDocument.createElementNS(xmlns, "text");
	tmp_text.setAttributeNS(null, "id", id+"_text");
	tmp_text.setAttributeNS(null,"font-size", "12");
	tmp_text.setAttributeNS(null,"font-family", "arial");
	tmp_text.setAttributeNS(null,"x", parseInt(x) -24);//一个汉字24个像素
	tmp_text.setAttributeNS(null,"y", parseInt(y) +20);
	tmp_text.setAttributeNS(null, "font-weight", "");
	tmp_text.textContent = name;
	tmp_text.setAttributeNS(null, "cursor", "pointer");
	tmp_text.setAttributeNS(null, "onselectstart","null");
	tmp_g.appendChild(tmp_text);
	
	SVGRoot.appendChild(tmp_g);	
	return tmp_g;
}

/*
*重新设置操作结果的名称位置，使其居中显示
*/
function setOperaterNameLocation(name,svg_id){
	var s_len=getStringLength(name);
	if(s_len==8){
		SVGDocument.getElementById(svg_id+"_text").setAttributeNS(null, 'x',parseInt(SVGDocument.getElementById(svg_id+"_img").getAttributeNS(null, 'cx'))-24);
	}else{
		SVGDocument.getElementById(svg_id+"_text").setAttributeNS(null, 'x',parseInt(SVGDocument.getElementById(svg_id+"_img").getAttributeNS(null, 'cx'))-(s_len)*6/2);
	}
}

/*
*重新设置活动环节的名称位置，使其居中显示
*/
function setActivityNameLocation(name,svg_id){
	var s_len=getStringLength(name);
	if(s_len==8){
		SVGDocument.getElementById(svg_id+"_text").setAttributeNS(null, 'x',parseInt(SVGDocument.getElementById(svg_id+"_img").getAttributeNS(null, 'x'))+img_width_height/2 -24);
	}else{
		SVGDocument.getElementById(svg_id+"_text").setAttributeNS(null, 'x',parseInt(SVGDocument.getElementById(svg_id+"_img").getAttributeNS(null, 'x'))+img_width_height/2 -(s_len)*6/2);
	}	
}

/*
*操作结果的中断显示效果
*/
function setOperaterBreak(svg_id,flag){
	if(flag=='1'){
		//中断的
		SVGDocument.getElementById(svg_id+"_img").setAttributeNS(null, "fill", "black");
	}else{
		SVGDocument.getElementById(svg_id+"_img").setAttributeNS(null, "fill", "#C3D9FF");
	}
}

/*
*操作结果的中断显示效果
*/
function setOperaterFinish(svg_id,flag){
	if(flag=='1'){
		//中断的
		SVGDocument.getElementById(svg_id+"_img").setAttributeNS(null, "fill", "red");
	}else{
		SVGDocument.getElementById(svg_id+"_img").setAttributeNS(null, "fill", "#C3D9FF");
	}
}

/*
*后续线的三种效果
*/
function setNextActivityLine_n(svg_id,num){
	if(num=='0'){
		SVGDocument.getElementById(svg_id+"_line_n_1").setAttributeNS(null, "stroke", "#649BDC");
		SVGDocument.getElementById(svg_id+"_line_n_1").setAttributeNS(null, "stroke-dasharray","");
		SVGDocument.getElementById(svg_id+"_line_n_2").setAttributeNS(null, "stroke", "#649BDC");
		SVGDocument.getElementById(svg_id+"_line_n_2").setAttributeNS(null, "stroke-dasharray","");
	}
	if(num=='1'){
		SVGDocument.getElementById(svg_id+"_line_n_1").setAttributeNS(null, "stroke", "#B848FF");
		SVGDocument.getElementById(svg_id+"_line_n_1").setAttributeNS(null, "stroke-dasharray","3 3 3 3");
		SVGDocument.getElementById(svg_id+"_line_n_2").setAttributeNS(null, "stroke", "#B848FF");
		SVGDocument.getElementById(svg_id+"_line_n_2").setAttributeNS(null, "stroke-dasharray","3 3 3 3");
	}
	if(num=='2'){
		SVGDocument.getElementById(svg_id+"_line_n_1").setAttributeNS(null, "stroke", "red");
		SVGDocument.getElementById(svg_id+"_line_n_1").setAttributeNS(null, "stroke-dasharray","7 7 7 7");
		SVGDocument.getElementById(svg_id+"_line_n_2").setAttributeNS(null, "stroke", "red");
		SVGDocument.getElementById(svg_id+"_line_n_2").setAttributeNS(null, "stroke-dasharray","7 7 7 7");
	}
}

/*
*设置后续线的【触发顺序、执行与否不影响其他活动】效果
*/
function setNextActivityLine(svg_id,triggerListNo,effect){
	if(effect=='1'){
		//影响其他活动
		setNextActivityLine_n(svg_id,'2');
		return;
	}
	
	if(triggerListNo=='0'){
		//影响触发顺序
		setNextActivityLine_n(svg_id,'0');
	}else{
		setNextActivityLine_n(svg_id,'1');
	}		
}
/*
*后续线连上操作结果时连线设置
*/
function setNextActivityLineLinkLine1(svg_id,x,y){
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'x2',parseInt(x));
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'y2',parseInt(y));
	SVGDocument.getElementById(svg_id).setAttributeNS(null, "stroke-width","1");
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'pointer-events', 'none');
	
}

/*
*后续线连上活动环节时连线设置
*/
function setNextActivityLineLinkLine2(svg_id,x,y){

	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'x2',parseInt(x) + img_width_height/2);
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'y2',parseInt(y) + img_width_height/2);
	SVGDocument.getElementById(svg_id).setAttributeNS(null, "stroke-width","1");
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'pointer-events', 'none');
}

/*
*操作结果连上活动环节时连线设置
*/
function setOperaterLinkLine(svg_id,x,y){
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'x2',parseInt(x) + img_width_height/2);
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'y2',parseInt(y) + img_width_height/2);
	SVGDocument.getElementById(svg_id).setAttributeNS(null, "stroke-width","1");
	SVGDocument.getElementById(svg_id.replace('_line','_img')).setAttributeNS(null, "r", 7);
	SVGDocument.getElementById(svg_id).setAttributeNS(null, 'pointer-events', 'none');
}

/*
*箭头的连接跟转
*/
function setNextActivityLineArrowEffect(id_line){
	//箭头的
	var x=parseInt(SVGDocument.getElementById(id_line).getAttributeNS(null, 'x1'));
	var y=parseInt(SVGDocument.getElementById(id_line).getAttributeNS(null, 'y1'));
	var x1=parseInt(SVGDocument.getElementById(id_line).getAttributeNS(null, 'x2'));
	var y1=parseInt(SVGDocument.getElementById(id_line).getAttributeNS(null, 'y2'));	
	setArrowXY("g_tmp_"+id_line.replace('_line_n_1','_polyline'),x1,y1,x,y);
}
/*
*画箭头的坐标轨迹
*/
function setArrowXY(id,x1,y1,x,y){
	var pointsXY=getArrowKeypoints(x1,y1,x,y);
	SVGDocument.getElementById(id).setAttributeNS(null, "points", pointsXY[0]+","+pointsXY[1]+" "+pointsXY[2]+","+pointsXY[3]+" "+pointsXY[4]+","+pointsXY[5]+" "+pointsXY[0]+","+pointsXY[1]);
}

/*
*获取线的箭头坐标
*/
function getArrowKeypoints(startX,startY,endX,endY){
	var arrowRadius = 5;   //箭头尺寸大小就靠它了
	var pointsXY = [0,0,0,0,0,0];
	//根据关系直线起至坐标获得线的夹角
	var tmpx = endX - startX ;
	var tmpy = startY - endY;
	var angle = Math.atan2(tmpy,tmpx)*(180/Math.PI);
	
	var centerX = endX - arrowRadius * Math.cos(angle *(Math.PI/180)) ;
	var centerY = endY + arrowRadius * Math.sin(angle *(Math.PI/180)) ;
	//var topX = endX ;
	//var topY = endY  ;         
	var leftX = centerX + arrowRadius * Math.cos((angle +120) *(Math.PI/180));
	var leftY = centerY - arrowRadius * Math.sin((angle +120) *(Math.PI/180));
	var rightX = centerX + arrowRadius * Math.cos((angle +240) *(Math.PI/180));
	var rightY = centerY - arrowRadius * Math.sin((angle +240) *(Math.PI/180));
	 
	pointsXY[0] = leftX;
	pointsXY[1] = leftY;
	//pointsXY[2] = centerX;   //在箭身靠终点的一个点，这样画箭头更漂亮些
	//pointsXY[3] = centerY;
	pointsXY[2] = endX;
	pointsXY[3] = endY;
	
	pointsXY[4] = rightX;
	pointsXY[5] = rightY;
	return pointsXY;
}

//对选中的对象进行闪烁
function setHide2show(svg_id,num){		
	var x=0,y=0,width=0,height=0;
	if(num==2){
		//活动环节
		x=parseInt(getActivityJson(svg_id).x) -1;
		y=parseInt(getActivityJson(svg_id).y) -1;
		width=34;
	}else if(num==3){
		//结果线
		x=parseInt(getOperaterJson(svg_id).x) -10;
		y=parseInt(getOperaterJson(svg_id).y) -10;
		width=20;
	}else if(num==4){
		//后续线
		x=parseInt(getNextActivityLineJson(svg_id).x) -8;
		y=parseInt(getNextActivityLineJson(svg_id).y) -8;
		width=16;
	}
	height=width;
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"x",parseInt(x) -x_move_length);
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"y",y);
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"width",width);
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"height",height);
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"display","inline");
}

/*
*获取环节的json对象
*/
function getActivityJson(id){
	var obj=null;
	var str="obj=jsonData_activity."+id;
	eval(str);
	if(obj==null){
		str="jsonData_activity."+id+"={}";
		eval(str);
		str="obj=jsonData_activity."+id;
		eval(str);
	}
	return obj;
}

/*
*获取操作结果的json对象
*/
function getOperaterJson(id){
	var obj=null;
	str="obj=jsonData_operater."+id;
	eval(str);
	if(obj==null){
		str="jsonData_operater."+id+"={}";
		eval(str);
		str="obj=jsonData_operater."+id;
		eval(str);
	}
	return obj;
}

/*
*获取后续线的json对象
*/
function getNextActivityLineJson(id){
	var obj=null;
	var str="obj=jsonData_nextActivityLine."+id;
	eval(str);
	if(obj==null){
		str="jsonData_nextActivityLine."+id+"={}";
		eval(str);
		str="obj=jsonData_nextActivityLine."+id;
		eval(str);
	}
	return obj;
}

