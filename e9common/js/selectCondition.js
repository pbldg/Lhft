/**
	查询条件的统一风格,将原来的 放在div 或 table 中的查询条件用 <fieldset> 标签框起,fieldset 的ID 固定为 SELECT_CONDITION
	如
	<fieldset id="SELECT_CONDITION">
		<div>
			查询条件
		</div>
	</fieldset>
	或
	<fieldset id="SELECT_CONDITION">
		<table width="100%" cellpadding="0" cellspacing="1" border="0" class="new_table">
			<tr>
				<td width="20%" align="right" class="new_td1">						
					地区代码：
				</td>
				<td width="80%" class="new_td2">
					<input name="SEL_DQDM" type="text" size="30">
				</td>
			</tr>
		</table>
	</fieldset>
	
	
	具体调用方法:
	
	页面文件导入:
	<link rel="stylesheet" type="text/css" href="css/selectCondition.css">
	<script language="javascript" src="js/selectCondition.js"></script>
	
	页面代码:
	<fieldset id="SELECT_CONDITION">
		--查询条件
	</fieldset>
	<script>createSelectCondition();</script>	
	
	要求页面上不要使用 SELECT_CONDITION 或 SELECT_CONDITION_IMG 做为ID
	
**/

//创建查询条件对象 defaultParam为默认值的是display还是none, (如果加号图片无法显示,则传入上下文路径做为参数)
function createSelectCondition(defaultParam,path,nodename){
	createSelectConditions(defaultParam,path,nodename,null);
}
//创建查询条件对象 defaultParam为默认值的是display还是none, (如果加号图片无法显示,则传入上下文路径做为参数),NODEID查询关联ID
function createSelectConditions(defaultParam,path,nodename,NODEID){
	var obj ;
	if(isNotBlank(NODEID)){
		obj=document.getElementById(NODEID);
	}else{
		obj=document.getElementById('selectCondition');
	}
	
	//ie下fieldset默认就有圆角
	if($.browser.msie) {
		$(obj).removeClass("ui-corner-all");
	}
	var legend = document.createElement("legend");
	
	var span = document.createElement("span");
	span.className="ui-icon tree-wrap-ltr ui-icon-circlesmall-minus";
	span.style.cursor="pointer";
	span.style.styleFloat="left";
	span.setAttribute("style","cursor:pointer;float: left;");
	legend.appendChild(span);

	//legend.style="border: 0px;cursor: pointer";
	legend.setAttribute("style","border: 0px;cursor: pointer;");
	legend.appendChild(document.createTextNode(nodename==null?"查询条件":nodename));
	legend.className="condition_name";
	var childNodes = obj.childNodes;
	legend.onclick = function(){
		chooseSelectCondition(obj);
	};
	
	obj.insertBefore(legend,childNodes[0]);
	if (defaultParam=="none"){
		chooseSelectCondition(obj);
	}
}

//显示隐藏查询条件
function chooseSelectCondition(obj,form,defaultParam){
	$(obj).find("div").first().toggle();
	if($("span.tree-wrap-ltr").attr("class").indexOf("ui-icon-circlesmall-minus")>0){
		$("span.tree-wrap-ltr").removeClass("ui-icon-circlesmall-minus");
		$("span.tree-wrap-ltr").addClass("ui-icon-circlesmall-plus");
	}else{
		$("span.tree-wrap-ltr").removeClass("ui-icon-circlesmall-plus");
		$("span.tree-wrap-ltr").addClass("ui-icon-circlesmall-minus");
	}
	$(window).trigger('resize');
}