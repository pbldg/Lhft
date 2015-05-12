<%@page import="com.xmzy.frameext.simpledb.DBDYPO"%>
<%@page import="com.xmzy.framework.utils.JspHelper"%>
<%@ page contentType="text/html; charset=UTF-8" language="java" errorPage=""%>
<%
	JspHelper helper = new JspHelper(request);
	String errMsg = helper.getErrMsg();
	String path = request.getContextPath();
	DBDYPO dic_flow = (DBDYPO)helper.getObjValue("WF_DIC_FLOW");	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<META http-equiv="Content-Type" content="text/html; charset=UTF-8"/>	
		<SCRIPT language="javascript" src="/e9common/jquery/js/jquery-1.7.2.min.js"></SCRIPT>
		<SCRIPT language="javascript" src="/e9common/js/uiwindow.js"></SCRIPT>
		<SCRIPT language="javascript" src="/e9common/js/common.js"></SCRIPT>
		<script>
			function savaFlowData(flag){
				$("#UPDATE_VERSION").val(flag);
				form1.submit();
			}
			//新增和修改成功后跳转页面中执行此函数
			function ExecuteResultNotice(result,message){				
				if(result=="0"){
					$.uialert(message);
					return;
				}
				$.uimessage(message);
				var currTabId = $(window.top.document).find(".ui-tabs-selected > a").attr("href");
				currTabId = currTabId.substring(1);
				currTabId = currTabId + "-frame";
                var pc = parent.$("#"+currTabId).contents();
                if(currTabId==""){
                	pc = $(window.parent.document);
                	if(pc.find("#searchBtn").size()==0){
                		//如果还是找不到查询按钮，则需要再处理
                	}
                }
                if(pc!=null){
            		pc.find("#searchBtn").click();//弹出本窗口的iframe页面中的查询按钮
                	if(window.top.checkRelatePage){
                    	window.top.checkRelatePage(pc.find("#RESOURCE_ITEMNO").text(), pc.find("#RESOURCE_RELATEITEMNO").text());//顶级窗口的检测相关性
                    }
                }
                cancel();
				//parent.ss.workspace.AjaxQuery();
				//parent.closeDivWindow();				
			}
			$(function(){
				//$("#wf_main_iframe").height(window.top.$("#topIframe").height()-15);
				window.top.$("#topIframe").attr("scrolling","no");
			 });
		</script>	
	</head>
	<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="overflow: auto;" >
		<iframe id='ifrmame_target' src="" style="display: none;" name="ifrmame_target"></iframe>
		<form action="HttpChannel" method="post" target="ifrmame_target" name="form1">
			<input type="hidden"  name="action" value="WFLOW_SAVE"/>	
			<textarea name='FLOW_DATA' id="id_textarea_json" rows="2" cols="2" style="display: none;"><%=dic_flow.get("FLOW_DATA") %></textarea>
			<input type="hidden" id="FLOW_ID" name="FLOW_ID" value="<%=dic_flow.get("FLOW_ID") %>"/>
			<input type="hidden" id="FLOW_VERSION" name="FLOW_VERSION" value="<%=dic_flow.get("FLOW_VERSION") %>"/>
			<input type="hidden" id="FLOW_NAME" name="FLOW_NAME" value="<%=dic_flow.get("FLOW_NAME") %>"/>	
			<input type="hidden" id="UPDATE_VERSION" name="UPDATE_VERSION" value="1">
	  </form>  
	  <iframe id="wf_main_iframe" src="<%=path%>/wflow/designer/wf_main.html"  height="100%" width="100%" style='border:none;' scrolling="auto"></iframe>
	</body>
</html>