 
/**
 * 构建课程下拉框
 * 
 * @param selectValue 选中值
 * @param inputId 课程下拉框的ID
 * @param enable 课程是否有效,值：1 有效，0失效
 * @param emptyoption 是否显示请选择
 */
function buildCourseSelect(selectValue, inputId, enable, emptyoption){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=os.courseinfo!queryCourseList&ENABLE=" + enable;
	$.hkajax(url, "", {
		success:function(data){
			var $inputObj = $("#" + inputId);
			$inputObj.html("");
			if(emptyoption){
				$inputObj.append("<option value=''>-- 请选择 --</option>");
			}
			$.each(data.Rows,function(i,item){
				var selected = "";
				if(selectValue == item.COURSE_ID)
					selected = "selected";
				$inputObj.append("<option value='" + item.COURSE_ID + "' " + selected + ">" + item.COURSE_NAME + "</option>");
			});
		}
	});
}

/**
 * 构建试题分类下拉框
 * 
 * @param selectValue 选中值
 * @param inputId 试题分类下拉框的ID
 * @param courseId 课程ID
 * @param enable 课程是否有效,值：1 有效，0失效
 * @param emptyoption 是否显示请选择
 */
function buildQsCategorySelect(selectValue, inputId, courseId, enabled, emptyoption){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=question.category!queryQsCategory&ENABLED=" + enabled + "&COURSE_ID=" + courseId;
	$.hkajax(url, "", {
		success:function(data){
			var $inputObj = $("#" + inputId);
			$inputObj.html("");
			if(emptyoption){
				$inputObj.append("<option value=''>-- 请选择 --</option>");
			}
			$.each(data.Rows,function(i,item){
				var selected = "";
				if(selectValue == item.QS_CATEGORY_ID)
					selected = "selected";
				$inputObj.append("<option value='" + item.QS_CATEGORY_ID + "' " + selected + ">" + item.QS_CATEGORY_NAME + "</option>");
			});
		}
	});
}

/**
 * 试题选择器
 * @param selectQuestionId 选中的试题
 * @param qsType  试题类型
 * @param popSource 弹出源：POP:弹出窗口，TAB:tab窗口
 * @param onlyOne 是否只能选择一个
 * @param callback 回调函数
 */
function questionSelect(selectQuestionId, qsType, popSource, onlyOne, callBack){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=question.question!questionSelect";
	url += "&SELECTED_QUESTION_ID=" + selectQuestionId;
	url += "&QS_TYPE=" + qsType;
	url += "&POP_SOURCE=" + popSource;
	url += "&ONLYONE=" + onlyOne;//是否只能选择一条记录
	if(callBack){
		url += "&CALLBACK=" + callBack;//回调
	}
	$.uiPopWindow('questionDialog', url, {
		closeOnEscape: true,
		title: "习题选择窗口", 
		width: 800, 
		height: 500, 
		draggable: true
	});
}

/**
 * 试卷选择器
 * @param selectExampaperId 选中的试卷
 * @param codeInputId  试卷ID对应的文本框ID
 * @param nameInputId  试卷名称对应的文本框ID
 * @param popSource 弹出源：POP:弹出窗口，TAB:tab窗口
 * @param onlyOne 是否只能选择一个
 * @param callback 回调函数
 */
function exampaperSelect(selectExampaperId, codeInputId, nameInputId, popSource, onlyOne, callBack){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=exam.paper!exampaperSelect";
	url += "&SELECTED_EXAMPAPER_ID=" + selectExampaperId;
	url += "&CODE_INPUT_ID=" + codeInputId;
	url += "&NAME_INPUT_ID=" + nameInputId;
	url += "&POP_SOURCE=" + popSource;
	url += "&ONLYONE=" + onlyOne;//是否只能选择一条记录
	if(callBack){
		url += "&CALLBACK=" + callBack;//回调
	}
	$.uiPopWindow('exampaperDialog', url, {
		closeOnEscape: true,
		title: "试卷选择窗口", 
		width: 700, 
		height: 450, 
		draggable: true
	});
}

/**
 * 人员选择器
 * @param selectUserId 选中的用户
 * @param codeInputId  用户ID对应的文本框ID
 * @param nameInputId  用户名称对应的文本框ID
 * @param popSource 弹出源：POP:弹出窗口，TAB:tab窗口
 * @param onlyOne 是否只能选择一个
 * @param callback 回调函数
 */
function userSelect(selectUserId, codeInputId, nameInputId, popSource, onlyOne, callBack){
	var url = "HttpChannel?action=GOTO_ACTION&BUSINESS_TYPE=sso.employee&CMD=USER_SELECT";
	url += "&SELECTED_USER_ID=" + selectUserId;
	url += "&CODE_INPUT_ID=" + codeInputId;
	url += "&NAME_INPUT_ID=" + nameInputId;
	url += "&POP_SOURCE=" + popSource;
	url += "&ONLYONE=" + onlyOne;//是否只能选择一条记录
	if(callBack){
		url += "&CALLBACK=" + callBack;//回调
	}
	$.uiPopWindow('userDialog', url, {
		closeOnEscape: true,
		title: "用户选择窗口", 
		width: 700, 
		height: 450, 
		draggable: true
	});
}

/**
 * 刷新列表
 */
function refreshTable(queryAction){
	commonQuery(queryAction,"gridTable","searchform","searchBtn");
}

/**
 * 弹出课程选择框 
 */
function popCourse(callBack,parentId){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=os.courseware&BIZMETHODNAME=popCourse";
		url += "&PARENT_ID=" + parentId;
	if(callBack){
		url += "&CALLBACK="+callBack;//回调
	}
	$.uiPopWindow(
		'courseDialog',
		url,
		{
			closeOnEscape: true,
			title: "课件选择窗口", 
			width: 600, 
			height: 450, 
			draggable: true
		});
}

/**
 * 弹出课程选择器窗口
 * 
 * @param callback
 */
function popCourseSelector(callback) {
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=os.courseinfo!openCourseSelector";

	url += '&POP_SOURCE=POP';
	url += '&COURSE_CODE_INPUT=COURSE_ID';
	url += '&COURSE_NAME_INPUT=COURSE_NAME';

	if (callback) {
		url += "&CALLBACK=" + callback;// 回调
	}

	$.uiPopWindow('courseSelectorDialog', url, {
		closeOnEscape : true,
		title : "课程选择窗口",
		width : 700,
		height : 450,
		draggable : true
	});
}

/**
 * 弹出文件库目录选择框 
 */
function popFileCatalog(callBack){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=os.filelib!popFileCatalog";
	if(callBack){
		url += "&CALLBACK="+callBack;//回调
	}
	$.uiPopWindow(
		'FileCatalogDialog',
		url,
		{
			closeOnEscape: true,
			title: "文件目录选择窗口", 
			width: 600, 
			height: 450, 
			draggable: true
		});
}

/**
 * 弹出练习题选择框 
 */
function popQuestion(callBack,parentId){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=os.courseware&BIZMETHODNAME=popQuestion";
		url += "&PARENT_ID=" + parentId;
	if(callBack){
		url += "&CALLBACK="+callBack;//回调
	}
	$.uiPopWindow(
			'questionDialog',
			url,
			{
				closeOnEscape: true,
				title: "试题选择窗口", 
				width: 600, 
				height: 450, 
				draggable: true
			});
}

/**
 * 弹出添加章节的窗口
 */
function popSort(callBack,sortId,link_a_id){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=os.sort&BIZMETHODNAME=popSort&SORT_ID="+sortId;
	url += "&LINK_A_ID=" + link_a_id;
	if(callBack){
		url += "&CALLBACK="+callBack;//回调
	}
	$.uiPopWindow(
			'SortDialog',
			url,
			{
				closeOnEscape: true,
				title: "添加章节窗口", 
				width: 800, 
				height: 580, 
				draggable: true
			});
}

/**
 * 弹出添加文件的窗口
 */
function popFile(url){
	$.uiPopWindow(
			'FileDialog',
			url,
			{
				closeOnEscape: true,
				title: "添加文件信息窗口", 
				width: 800, 
				height: 500, 
				draggable: true
			});
}

/**
 * 弹出上传图片窗口
 */
function popPic(url,callBack){
	
	if(callBack){
		url += "&CALLBACK="+callBack;//回调
	}
	$.uiPopWindow(
			'PicDialog',
			url,
			{
				closeOnEscape: true,
				title: "编辑", 
				width: 300, 
				height: 300, 
				draggable: true
			});
}

function popExercise(url){
	$.uiPopWindow(
			'ExeDialog',
			url,
			{
				closeOnEscape: true,
				title: "习题信息", 
				width: 800, 
				height: 500, 
				draggable: true
			});
}

function popSaveInfoCustom(url,title,width,height){
	if(url.indexOf("&TMP=")<0){
		url = url + "&TMP=" + new Date();
	}
	pDialog = $.jqTopOpen(url, 
			{ 
				closeOnEscape: false,
				title: title, 
				width: width, 
				height: height, 
				draggable: true,
		        open: function(event, ui) {
		    	     $(".ui-dialog-titlebar-close", $(this).parent()).hide();
		    	  }
		});
}

/**
 * 前台分页
 * tableId: 表格ID
 * url: 
 * options: 自定义参数
 */
jQuery.extend(jQuery, { 
	jDatatable: function(tableId, url, param, options) {
		if (!jQuery().dataTable) {
			alert("请导入dataTables的相关文件");
			return;
		}
		  
		var oTable = $('#' + tableId).dataTable($.extend({
			 //"bStateSave": true, 是否将配置信息保存到cookies 中
			 //"iCookieDuration": 60*60*24; // 1 day 保存时间(秒)
             "bProcessing": "true", //是否显示加载中字样
             "sAjaxSource": url + "&" + param + (param==null || param=="" ? "TMP=" : "&TMP=" ) + new Date(),  
		 	 //"bDeferRender": true,
             "bServerSide": true,//
		 	 "sAjaxDataProp": "Rows",// 默认为aaData 
             "aLengthMenu": [
                 [10, 20, 50],
                 [10, 20, 50] // change per page values here
             ],
             // set the initial value
             "iDisplayLength": 10,
            //"bFilter": false,
            // "sPaginationType": "bootstrap",//页数按钮显示样式
             "oLanguage": {
            	 "sSearch": "搜索：",
             	 "sInfoEmpty": "",
             	 "sZeroRecords": " 找不到匹配的记录",
             	 "sInfoFiltered": "",
             	 "sProcessing": "请稍后，正在查找中...",
             	 "sInfo": "  _START_ - _END_ 共  _TOTAL_ 条",
                 "sLengthMenu": "_MENU_ 每页记录",
                 "oPaginate": {
                	 "sFirst": "首页",
                 	 "sLast": "尾页",
                 	 "sPrevious": "上页",
                     "sNext": "下页"
                  }
             }, 
             "sDom": "<'row-fluid'<'span6'l><'span6'>r>t<'row-fluid'<'span6'i><'span6'p>>",
             "fnInitComplete": function(oSettings, json) { }
         }, options)); 
		
		return oTable;
	}
}); 

/**
 * 重新加载dataTables
 * @param oTable 
 * @param url
 */
function reloadDatables(oTable, url, searchformid){
	var oSettings = oTable.fnSettings();
	oSettings.sAjaxSource = url + "&" + $("#"+searchformid).serialize() + "&TMP=" + new Date();
	oTable.fnDraw();
}

/**
 * 回车键查询
 * @param formId
 * @param searchBtnId
 */
function enterSearch(formId, searchBtnId){
	$("#" + formId).find("input[type='text']").keydown(function(e){
		if(e.keyCode == 13){
			$("#" + searchBtnId).click();
		}
	});
	$("#" + formId).find("select").keydown(function(e){
		if(e.keyCode == 13){
			$("#" + searchBtnId).click();
		}
	});
}

/**
 * 查询附件 (和file.html里面的getAttachfile方法一致)
 * @param tableName
 * @param recId
 * @param attachType
 */
function buildAttachfile(tableName, recId, attachType){
	var html = "";
	$.ajax({async : false, cache:false, type: 'POST',  
        dataType : "json",  
        url: "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=platform.file!queryAttachByRecId&TABLENAME="+tableName+"&REC_ID="+recId+"&ATTACHTYPE="+attachType,//请求的action路径  
        error: function () {//请求失败处理函数  
            alert('请求失败');  
        },  
        success:function(data){ //请求成功后处理函数。 
        	for ( var i = 0; i < data.length; i++) {
				var json = data[i];
				html += "， <a href='javascript:void(0)' onclick='downloadFile(\"" + json.name + "\", \"" + json.attachId + "\")'>" + json.name + "</a>  ";
			}
        }
    }); 
	if(html != ""){
		html = html.substring(1);
	}
	return html;
}

/**
 * 下载附件(和file.html里面的zTreeOnClick方法一致)
 * @param attachName
 * @param attachId
 */
function downloadFile(attachName, attachId){
	if(attachName.indexOf(".jpg")>0
			||attachName.indexOf(".jpeg")>0
			||attachName.indexOf(".gif")>0
			||attachName.indexOf(".png")>0){
		//图片直接打开
		window.open("HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=platform.file!download&ATTACH_ID="+attachId);
	}else{
		var iframe;
    	if($("#filesIframe").length == 0){
    		var $iframe = "<iframe id='filesIframe' name='filesIframe' style='display:none;'></iframe>";
    		$("body").append($iframe);
    	}
    	iframe = $("#filesIframe")[0];
    	iframe.src = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=platform.file!download&ATTACH_ID="+attachId;
	}
}

function hideValidateMessage( id){
	$("#" + id).validationEngine("hide");
}


