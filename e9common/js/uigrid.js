jQuery.extend(jQuery, {
  // jQuery UI alert弹出提示
  grid: function(gridid,url,param,pagerid, options) {
	  
    return $("#"+gridid).jqGrid($.extend({
    	url: url + "&" + param + (param==null||param==""?"TMP=":"&TMP=")+new Date(),  
        datatype: "json",  
        height:"100%",
        width:"100%",
        mtype: "GET",  
        autoheight: true,  
        autowidth: true,  
        viewrecords: true,  
        rowNum: (pagerid==""||pagerid=="none")?100000:10,  
        rowList: [2,10,20,50,1000],  
        jsonReader: {  
          root:"Rows",        // 数据行（默认为：rows）  
          page: "CurrentPage",    // 当前页  
          total: "TotalPage",  // 总页数  
          records: "TotalRows",  // 总记录数  
          repeatitems : false     // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设   
        },  
        pager: pagerid==""?"#gridPager":(pagerid=="none"?"":("#"+pagerid)),  
        //shrinkToFit:false,
        hidegrid: false ,
        viewrecords: true, 
        multiselect: true,
        multiboxonly:false,
        pageFlag:pagerid==""?false:true,
        forceFit:true,
        loadError:function(xhr,status,error){
        	if(xhr.responseText.indexOf("<html>")>-1){
        		document.write(xhr.responseText);
        	}
        },
        loadComplete:function(){
        	resetPage(pagerid);
        }
    }, options));
  }
});
//重新布局分页工具栏
function resetPage(pagerid){
	$("#pg_"+pagerid).css("float","right");
	$("#"+pagerid+"_center").attr("align","");
	$("#"+pagerid+"_right").attr("align","");
	$("#pg_"+pagerid+" > table").css("table-layout","");
}
//取得grid中选中的checkbox的索引号
function getSelectedCheckbox(gridId){
	//判断是否有checkbox
	var  multFlag = $("#"+gridId).jqGrid("getGridParam","multiselect");
	if(multFlag){
		var str = $("#"+gridId).jqGrid("getGridParam","selarrrow");
		var ids = "";
		$.each(str,function(i,item){
			ids += "," + item;
		});
		if(ids!=""){
			ids = ids.substring(1);
		}
		return ids;
	}else{
		//未选中行时会返回null值
		var id = $("#"+gridId).jqGrid("getGridParam","selrow");
		return id == null ? "" : id;
	}
	
}
//选中指定行
function selectCheckbox(gridId,rowid){
	var selRowStr = $('#'+gridId).jqGrid('getGridParam','selarrrow')+",";
	var rowIdStr = rowid+",";
	if(selRowStr.indexOf(rowIdStr)<0){
		$('#'+gridId).jqGrid('setSelection',rowid);
	}
}
/**
 * 判断行是否被选中
 * @param gridId 表格ID
 * @param rowid 行号
 * @returns {Boolean}
 */
function checkSelected(gridId,rowid){
	var selRowStr = $('#'+gridId).jqGrid('getGridParam','selarrrow')+",";
	var rowIdStr = rowid+",";
	if(selRowStr.indexOf(rowIdStr)<0){
		return false;
	}
	return true;
}
//计算grid高度
//calDivsId，是那些占固定高度的div的id，多个以,隔开
function resizeGrid(gridTableId,calDivsId,contentDivId,tabFlag){
	var objHeight = getOpenerFrameHeight(document) - calDivsHeight(calDivsId);
	//宽度
	var gwdth = $("#"+contentDivId).width()-5;
	//如果有tab，则需要再减去tab的头
	if(tabFlag){
		objHeight = objHeight - $(".ui-tabs-nav").outerHeight() - 2;
		//减去tab的padding-left宽度
		gwdth = gwdth - 2;
		/*
		if($.browser.msie) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-3;
		}else if($.browser.opera) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-3;
		}else if($.browser.mozilla) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-2;
		}else if($.browser.safari) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-2;
		}
		*/
	}
	//alert("uigrid---="+calDivsHeight(calDivsId));
	//高度
	$("#"+gridTableId).setGridHeight(objHeight - 78 );//减去表格的标题和底部按钮区域
	
	if($.browser.msie) {
		//alert(navigator.userAgent);
		if(parseInt($.browser.version)>=7){
			//7.0以上才执行，否则有js错误
			//360 IE8内存此处也有错误
			try{
				$("#"+gridTableId).setGridWidth(gwdth);
			}catch(e){
				
			}
		}else{
			//$("#"+gridTableId).setGridWidth(gwdth);//IE6下会执行非常多次，导致很慢或出错
			//window.event.cancelBubble = true;//似乎没有用
		}
	}else{
		$("#"+gridTableId).setGridWidth(gwdth);
	}
	
}
//计算grid高度(有caption的)
//calDivsId，是那些占固定高度的div的id，多个以,隔开
function resizeCaptionGrid(gridTableId,calDivsId,contentDivId,tabFlag){
	var objHeight = getOpenerFrameHeight(document) - calDivsHeight(calDivsId);
	//如果有tab，则需要再减去tab的头
	if(tabFlag){
		objHeight = objHeight - $(".ui-tabs-nav").outerHeight() - 2;
		/*
		if($.browser.msie) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-3;
		}else if($.browser.opera) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-3;
		}else if($.browser.mozilla) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-2;
		}else if($.browser.safari) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-2;
		}
		*/
	}
	//alert("uigrid---="+calDivsHeight(calDivsId));
	//高度
	$("#"+gridTableId).setGridHeight(objHeight - 84 - $(".ui-jqgrid-titlebar").height());//减去表格的标题和底部按钮区域
	
	//宽度
	var gwdth = $("#"+contentDivId).width()-5;

	if($.browser.msie) {
		//alert(navigator.userAgent);
		if(parseInt($.browser.version)>=7){
			//7.0以上才执行，否则有js错误
			//360 IE8内存此处也有错误
			try{
				$("#"+gridTableId).setGridWidth(gwdth);
			}catch(e){
				
			}
		}else{
			//$("#"+gridTableId).setGridWidth(gwdth);//IE6下会执行非常多次，导致很慢或出错
			//window.event.cancelBubble = true;//似乎没有用
		}
	}else{
		$("#"+gridTableId).setGridWidth(gwdth);
	}
	
}
//计算grid高度
//calDivsId，是那些占固定高度的div的id，多个以,隔开
function resizePopWindowGrid(gridTableId,calDivsId,contentDivId,tabFlag){
	var objHeight = getOpenerFrameHeight(document) - calDivsHeight(calDivsId);
	//如果有tab，则需要再减去tab的头
	if(tabFlag){
		//objHeight = objHeight - $(".ui-tabs-nav").outerHeight() - 3;
		
		if($.browser.msie) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-3;
		}else if($.browser.opera) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-3;
		}else if($.browser.mozilla) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-2;
		}else if($.browser.safari) {
			objHeight = objHeight - $(".ui-tabs-nav").outerHeight()-2;
		}
		
	}
	//alert("uigrid---="+calDivsHeight(calDivsId));
	//高度
	$("#"+gridTableId).setGridHeight(objHeight - 41);//减去表格的标题和底部按钮区域
	
	//宽度
	var gwdth = $("#"+contentDivId).outerWidth()-5;
	$("#"+gridTableId).setGridWidth(gwdth);
	//$(".ui-jqgrid-htable").css("width",gwdth);
	//$("#"+gridTableId).css("width",gwdth);
}

//设置列的菜单
function setContextMenu(gridTableId,tabid){
	$.contextMenu({
        selector: '.ui-jqgrid-labels', 
        callback: function(key, options) {
        	if(key=="edit"){
        		chooseColumn(gridTableId,tabid);
        	}
        	if(key=="default"){
        		$.uiconfirm("该操作将刷新页面，确认该操作吗？", "确认提示",
        			function() {
        				returhDefault(gridTableId,tabid);
        			},
					function() {
					
					});
        		
        	}
        },
        items: {
        	"edit": {name: " 设置列", icon: "process"},
        	"default": {name: " 还原默认", icon: "refresh"}
        }
    });
}
//选择列
function chooseColumn(gridTableId,tabid){
	var gwdth = jQuery("#"+gridTableId).jqGrid("getGridParam","width");
	jQuery("#"+gridTableId).jqGrid('columnChooser',{
			width:520,
			done : function (perm) {
			      if (perm) {
			          this.jqGrid("remapColumns", perm, true);
			          this.jqGrid("setGridWidth",gwdth);
			          saveColumnConfiguration($("#"+gridTableId), tabid,"HttpChannel?action=SAVE_MYSELF_FORM_TABLE_SETTING");
			      } else {
			      }
		   }
	});
}
//还原默认
function returhDefault(grid,tabid){
	var tabLogo = $("#"+tabid).attr("tabLogo");
	var url = "HttpChannel?action=SAVE_MYSELF_FORM_TABLE_SETTING&CMD=D&logo="+tabLogo;
	//保存到服务器
	jQuery.ajax({
        url: url,   // 提交的页面
        data: "", // 从表单中获取数据
        type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
        dataType:"json",
        error: function(request) {      // 设置表单提交出错
            $.uialert("保存出错，请稍候再试");
        },
        success: function(data) {
        	window.location.href=window.location.href;


        }
    });
}
//保存列设置到服务器
function saveColumnConfiguration(grid,tabid, url) {
    if (url.length > 0) {
    	var tabLogo = $("#"+tabid).attr("tabLogo");
        var colModel = grid[0].p.colModel;
        var colStr = "";
        
        for (var i = 0; i < colModel.length; i++) {
            if (colModel[i].name != "rn" && colModel[i].name != "cb") {
            	
            	if(!colModel[i].hidden){
            		colStr = colStr+(colStr==""?"":",")+colModel[i].name;
            	}
            }
        }
        
        var param = "logo="+tabLogo+"&rows="+colStr;
      	//保存到服务器
    	jQuery.ajax({
            url: url,   // 提交的页面
            data: param, // 从表单中获取数据
            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
            dataType:"json",
            error: function(request) {      // 设置表单提交出错
                $.uialert("保存出错，请稍候再试");
            },
            success: function(data) {
            }
        });
    }
}
//读取用户列设置信息第一个参数：gridid.第二个参数：有属性tabLogo="paramGroup"的对象的ID
function readColumnInfo(gridTableId,tabid){
	var tabLogo = $("#"+tabid).attr("tabLogo");
	//取信息
	jQuery.ajax({
        url: "HttpChannel?action=READ_MYSELF_FORM_TABLE_SETTING",   // 提交的页面
        data: "logo="+tabLogo, // 从表单中获取数据
        type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
        dataType:"json",
        error: function(request) {      // 设置表单提交出错
            $.uialert("读取列设置出错");
        },
        success: function(data) {
        	var col = data.result;
        	if(col!=null && col!=""){
        		var cols = col.split(",");
        		var gwdth = jQuery("#"+gridTableId).jqGrid("getGridParam","width");
        		jQuery("#"+gridTableId).jqGrid('hideCol',cols);
        		jQuery("#"+gridTableId).jqGrid("setGridWidth",gwdth);
        		jQuery(".ui-jqgrid-htable").css("width",gwdth);
        		jQuery("#"+gridTableId).css("width",gwdth);
        	}
        }
    });
}
//判断是否有分页
function checkPager(gridTableId){
	if($("#"+gridTableId).getGridParam("pageFlag")){
	}else{
		//没有分页时，隐藏分页工具条
		$("#gridPager_center").html("");
		$("#gridPager_right").html("");
	}
}
function checkPager2(gridTableId){
	if($("#"+gridTableId).getGridParam("pageFlag")){
	}else{
		//没有分页时，隐藏分页工具条
		$("#gridPager2_center").html("");
		$("#gridPager2_right").html("");
	}
}
//自定义隐藏域模板
function hkelem(value,options){
	return $('<span>'+value+'</span><input type="hidden" value="'+value+'"/>');
}
function hkval(elem){
	return elem.val();
}

/**
 * 将sourceGrid中的选中行移动到targetGrid中(使用前提：两个grid的列一样)
 * 
 * @param sourceGridTableId 原grid的ID
 * @param targetGridTableId 新grid的ID
 * @param messageId 显示信息的元素ID
 * @returns rowIds(数组，行ID)
 */
function jqGridRowMoveBySelect(sourceGridTableId, targetGridTableId, messageId){
	//判断是否有checkbox
	var  multFlag = $("#" + sourceGridTableId).jqGrid("getGridParam","multiselect");
	var selectedRowIds = "";
	if(multFlag){
		selectedRowIds = $("#" + sourceGridTableId).jqGrid("getGridParam","selarrrow");
	}else{
		selectedRowIds = $("#" + sourceGridTableId).jqGrid("getGridParam","selrow");
	}
	
	if(selectedRowIds.length == 0)
		return null;
	
	if($("#" + messageId).length > 0)
		$("#" + messageId).text("移动中...");
	
	var rowIds = new Array();
	$.each(selectedRowIds, function(index, id){
		rowIds.push(id);
	});
	//若是直接使用selectedRowIds循环，当原grid中删除一条记录时，selectedRowIds会发生改变
	$.each(rowIds, function(index, id){
		var rowData = $("#" + sourceGridTableId).jqGrid('getRowData', id);
		//添加到新的grid中
		$("#" + targetGridTableId).jqGrid('addRowData', id, rowData);
		//从原来的grid中删除
		$("#" + sourceGridTableId).jqGrid('delRowData', id);
	});
	
	if($("#" + messageId).length > 0)
		$("#" + messageId).text("");
	return rowIds;
}

/**
 * 获取jqgrid中某一列的值
 * @param selectedRowIds 选中行ID(格式可以为""，也可以为：XXX,XXX,XXX，还可以是数组)
 * @param gridtableId girdtable表ID
 * @param colName 列名
 * @returns 格式：XXX,XXX,XXX
 */
function getValueByColName(selectedRowIds, gridtableId, colName){
	var result = "";
	var rowIds = new Array();
	if(!selectedRowIds){//判断是否传入选中行ID
		//判断是否有checkbox
		var multFlag = $("#" + gridtableId).jqGrid("getGridParam","multiselect");
		if(multFlag){
			rowIds = $("#" + gridtableId).jqGrid("getGridParam","selarrrow");
		}else{
			rowIds = $("#" + gridtableId).jqGrid("getGridParam","selrow");
		}
	}else if(Object.prototype.toString.call(selectedRowIds) === '[object Array]'){//是否数组
		rowIds = selectedRowIds;
	}else{
		rowIds = selectedRowIds.split(",");
	}
	
	if(rowIds.length == 0)
		return null;
	
	//若是直接使用selectedRowIds循环，以下循环进行时，selectedRowIds会发生改变
	$.each(rowIds, function(index, id){
		var rowData = $("#" + gridtableId).jqGrid('getRowData', id);
		result = result + "," + rowData[colName];
	});
	
	return result.substring(1);
}
//**********