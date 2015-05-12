function getScrollTop(){
	return parent.getScrollTop();
}

function getScrollLeft(){
	return parent.getScrollLeft();
}
function createGraph(){
	var id=DragTarget.parentNode.id.replace('_d_','_c_')+"_"+parent.getCreateNum();
	var tmp_transMatrix = DragTarget.getCTM();
	var x=TrueCoords.x - Number(tmp_transMatrix.e);
	var y=TrueCoords.y - Number(tmp_transMatrix.f);

	if(DragTarget.parentNode.id=='wf_d_3'){
		//结果线
		return parent.createOperaterGraph(id,x,y,"操作结果");
	}

	if(DragTarget.parentNode.id=='wf_d_4'){
		//后续线
		return parent.createNextActivityLineGraph(id,x,y);
	}

	var userType=DragTarget.parentNode.id.replace('wf_d_','');
	//活动环节
	return parent.createActivityGraph(id,x,y,"活动名称",userType);
}

function operateButton(id){
	SVGDocument.getElementById('g_tmp_text_0').textContent="当前操作的ID="+id;
	parent.operateButton(id);
}

function setSvgHeight(height){
	//设置高度
	SVGRoot.setAttributeNS(null, 'height', height);
	SVGDocument.getElementById('g_tmp_text_0').textContent="高度="+SVGRoot.getAttributeNS(null, 'height');
}

function g_mouseDown(evt) {
	evt.preventDefault();		
	if(evt.button!=0){
		SVGDocument.getElementById('g_tmp_text_0').textContent='不是左键的返回';
		//不是左键的返回
		return ;
	}
	// find out which element we moused down on
	var targetElement = evt.target;		

	SVGDocument.getElementById('g_tmp_text_0').textContent="属性ID="+targetElement.id+",num="+parent.g_create_num;

	if(targetElement.id){
		if(targetElement.id.indexOf('g_tmp')>-1){
			return;
		}else{
			if(targetElement.id.indexOf('_line')>-1){
				DragTarget = targetElement;
				return;
			}
		}
	}else{
		return;
	}
	// set the item moused down on as the element to be dragged
	DragTarget = targetElement;
	if(DragTarget.parentNode){
		if(DragTarget.parentNode.id){
			if(DragTarget.parentNode.id.indexOf("wf_d_")>-1){						
				var tmp_g=createGraph();
				DragTarget=SVGDocument.getElementById(tmp_g.id+"_img");
			}
		}
	}else{
		return;
	}
	
	var transMatrix = DragTarget.getCTM();
	GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
	GrabPoint.y = TrueCoords.y - Number(transMatrix.f);
};


function g_mouseMove(evt) {	
	evt.preventDefault();			
	GetTrueCoords(evt);
	if (DragTarget) {				
		if(DragTarget.id.indexOf('_line')>-1){					
			if(DragTarget.id.indexOf('_line_n')>-1){
				if(!parent.checkNextActivityLine(DragTarget.id)){
					DragTarget.setAttributeNS(null, 'x2',  evt.clientX);
					DragTarget.setAttributeNS(null, 'y2',  parseInt(evt.clientY)+parseInt(getScrollTop()));
					
					if(DragTarget.id.indexOf('_line_n_1')>-1){
						//箭头的
						var x=DragTarget.getAttributeNS(null, 'x1');
						var y=DragTarget.getAttributeNS(null, 'y1');							
						var pointsXY=parent.getArrowKeypoints(parseInt(evt.clientX),parseInt(evt.clientY)+parseInt(getScrollTop()),parseInt(x),parseInt(y));							
						SVGDocument.getElementById("g_tmp_"+DragTarget.id.replace('_line_n_1','_polyline')).setAttributeNS(null, "points", pointsXY[0]+","+pointsXY[1]+" "+pointsXY[2]+","+pointsXY[3]+" "+pointsXY[4]+","+pointsXY[5]+" "+pointsXY[0]+","+pointsXY[1]);
					}
				}
				return;
			}

			//线的拖动,有关联上的固定不变
			if(!parent.checkOperaterLine(DragTarget.id.replace("_line",""))){
				parent.document.getElementById("dddd").value=evt.clientX;
				DragTarget.setAttributeNS(null, 'x2',  evt.clientX);
				DragTarget.setAttributeNS(null, 'y2',  parseInt(evt.clientY)+parseInt(getScrollTop()));
			}
			return;
		}
		g_mouseMove_2(evt);
	}
};

function g_mouseMove_2(evt){
	SVGDocument.getElementById("g_tmp_rect_2").setAttributeNS(null,"display","none");
	var newX = TrueCoords.x - GrabPoint.x;
	//newX=(newX<40)?40:newX;

	var newY = TrueCoords.y - GrabPoint.y;			
	
	var tmp_Target;

	if(DragTarget.parentNode){
		tmp_Target=DragTarget.parentNode;
	}else{
		tmp_Target=DragTarget;
	}
	
	SVGDocument.getElementById('g_tmp_text_0').textContent=tmp_Target.id+",newX="+newX+",newY="+newY+",clientY="+evt.clientY;

	if(tmp_Target.id){
		if(tmp_Target.id.indexOf("wf_c_")>-1){
			tmp_Target.setAttributeNS(null, 'transform', 'translate(' + newX + ','+ newY + ')');
			
			if(tmp_Target.id.indexOf("wf_c_3")>-1 ){
				//操作结果线的处理						
				SVGDocument.getElementById(tmp_Target.id+"_line").setAttributeNS(null, 'x1',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cx'))+newX);
				SVGDocument.getElementById(tmp_Target.id+"_line").setAttributeNS(null, 'y1',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cy'))+ newY );
				
				//有关联上的固定不变
				if(!parent.checkOperaterLine(tmp_Target.id)){
					SVGDocument.getElementById(tmp_Target.id+"_line").setAttributeNS(null, 'x2',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cx'))+newX -16);
					SVGDocument.getElementById(tmp_Target.id+"_line").setAttributeNS(null, 'y2',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cy'))+newY  );
				}
				//结果线的处理
				parent.setOperaterLine(tmp_Target.id);
				return;
			}
			if(tmp_Target.id.indexOf("wf_c_4")>-1){
				//后续线的处理
				SVGDocument.getElementById(tmp_Target.id+"_line_n_1").setAttributeNS(null, 'x1',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cx'))+newX );
				SVGDocument.getElementById(tmp_Target.id+"_line_n_1").setAttributeNS(null, 'y1',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cy'))+ newY );
				
				//有关联上的固定不变
				if(!parent.checkNextActivityLine(tmp_Target.id+"_line_n_1")){							
					SVGDocument.getElementById(tmp_Target.id+"_line_n_1").setAttributeNS(null, 'x2',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cx'))+newX +15);
					SVGDocument.getElementById(tmp_Target.id+"_line_n_1").setAttributeNS(null, 'y2',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cy'))+newY -15 );
					//---
				}

				SVGDocument.getElementById(tmp_Target.id+"_line_n_2").setAttributeNS(null, 'x1',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cx'))+newX );
				SVGDocument.getElementById(tmp_Target.id+"_line_n_2").setAttributeNS(null, 'y1',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cy'))+ newY );
				
				//有关联上的固定不变
				if(!parent.checkNextActivityLine(tmp_Target.id+"_line_n_2")){
					SVGDocument.getElementById(tmp_Target.id+"_line_n_2").setAttributeNS(null, 'x2',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cx'))+newX +15);
					SVGDocument.getElementById(tmp_Target.id+"_line_n_2").setAttributeNS(null, 'y2',parseInt(SVGDocument.getElementById(tmp_Target.id+"_img").getAttributeNS(null,'cy'))+newY +15 );
					//--
				}

				//箭头的
				var x=parseInt(SVGDocument.getElementById(tmp_Target.id+"_line_n_1").getAttributeNS(null, 'x1'));
				var y=parseInt(SVGDocument.getElementById(tmp_Target.id+"_line_n_1").getAttributeNS(null, 'y1'));
				var x1=parseInt(SVGDocument.getElementById(tmp_Target.id+"_line_n_1").getAttributeNS(null, 'x2'));
				var y1=parseInt(SVGDocument.getElementById(tmp_Target.id+"_line_n_1").getAttributeNS(null, 'y2'));	
				var pointsXY=parent.getArrowKeypoints(x1,y1,x,y);							
				SVGDocument.getElementById("g_tmp_"+tmp_Target.id+'_polyline').setAttributeNS(null, "points", pointsXY[0]+","+pointsXY[1]+" "+pointsXY[2]+","+pointsXY[3]+" "+pointsXY[4]+","+pointsXY[5]+" "+pointsXY[0]+","+pointsXY[1]);
					
				return;
			}
			//活动环节的处理
			parent.setActivityLine(tmp_Target.id);
			return;
		}
	}
	DragTarget.setAttributeNS(null, 'transform', 'translate(' + newX + ','+ newY + ')');
};

function g_mouseUp(evt) {			
	// if we aren't currently dragging an element, don't do anything
	if (DragTarget) {				
		if(DragTarget.id.indexOf('_line')>-1){
			parent.setLineXY(DragTarget.id,evt);
			DragTarget.setAttributeNS(null, 'pointer-events', 'all');
			DragTarget = null;
			parent.clearData();
			return;
		}
		g_mouseMove_2(evt);
		DragTarget.setAttributeNS(null, 'pointer-events', 'all');

		if(DragTarget.parentNode){
			if(DragTarget.parentNode.id){
				if(DragTarget.parentNode.id.indexOf("wf_d_")>-1 || DragTarget.parentNode.id.indexOf("wf_c_")>-1){
					DragTarget.parentNode.onclick();
				}
			}else{
				if(DragTarget.id.indexOf("wf_c_")>-1){
					DragTarget.onclick();
				}
			}
		}	
		DragTarget = null;
	}else{
		//evt.target.setAttributeNS(null, 'pointer-events', 'none');
		//SVGDocument.getElementById("g_tmp_rect_1").setAttributeNS(null, 'pointer-events', 'none');
		//SVGDocument.getElementById("BackDrop").setAttributeNS(null, 'pointer-events', 'none');
		parent.clearData();
	}
	
	
};

function GetTrueCoords(evt) {
	// find the current zoom level and pan setting, and adjust the reported
	// mouse position accordingly
	try{
		var newScale = SVGRoot.currentScale;
		var translation = SVGRoot.currentTranslate;
		TrueCoords.x = (evt.clientX - translation.x) / newScale;
		TrueCoords.y = (evt.clientY - translation.y) / newScale;
	}catch(x){		
	}
};


//选中的画笔
function createNewGraph(name){
	//alert(name);
}