<%@page import="com.xmzy.framework.utils.JspHelper"%>
<%@ page contentType="text/html; charset=UTF-8" language="java" errorPage=""%>
<%
	JspHelper helper = new JspHelper(request);
	String errMsg = helper.getErrMsg();
	String path = request.getContextPath();
%>
		<textarea id="WF_FLOW_JSON_DATA" style="display: none;"><%=helper.getStringValue("WF_FLOW_JSON_DATA")%></textarea>
		<textarea id="WF_TODO_JSON_DATA" style="display: none;"><%=helper.getStringValue("WF_TODO_JSON_DATA")%></textarea>
		<textarea id="WF_DO_JSON_DATA" style="display: none;"><%=helper.getStringValue("WF_DO_JSON_DATA")%></textarea>
		<div id="id_div_map" style="display: none;font-size: 14;font-weight: bold;height: 99%;overflow-y: auto;" onclick="$('#id_pop_info').hide();">
			流程名称：<span id="id_span_flow_name"></span><hr/>
			<img src="" border="0" usemap="#planetmap" id='id_svg_image'/>
			<map name="planetmap" id="planetmap">
			</map>
			<div id="id_pop_info" style="border:1;display:none;background-color:beige;width:50%;height:200;overflow-y: auto;">   
			</div> 
		</div>
		<div  id='id_div_iframe' style="display: none;height: 99%;">
			<iframe id="flow_graph_iframe" width="100%"  style="border: none;" scrolling="auto"></iframe>
		</div>
		
	<script>
		$(function(){
			$("#flow_graph_iframe").height(window.top.$("#topIframe").height()-85);
			$("#id_div_map").height(window.top.$("#topIframe").height()-85);
			
			
			var b_true=1;
			if($.browser.msie){
				if(parseInt($.browser.version)<9){
					b_true=0;
				}
			}
			//if($.browser.mozilla){
				//b_true=0;
			//}
			
			if(b_true==0){
				$("#id_svg_image").attr("src",'HttpChannel?action=WFLOW_SHOW_SVG_IMAGE&WF_INSTANCE_UUID=<%=helper.getObjValue("WF_INSTANCE_UUID")%>&WF_FLOW_ID=<%=helper.getObjValue("WF_FLOW_ID") %>&WF_FLOW_VERSION=<%=helper.getObjValue("WF_FLOW_VERSION")%>');
				$("#id_div_map").show();
			}else{
				$("#flow_graph_iframe").attr("src","<%=path%>/wflow/instance/wf_svg_graph.html");
				$("#id_div_iframe").show();
			}
			
			if(b_true==0){
				$("#id_span_flow_name").html(jQuery.parseJSON($("#WF_FLOW_JSON_DATA").val()).flowName+"("+jQuery.parseJSON($("#WF_FLOW_JSON_DATA").val()).flowId+","+jQuery.parseJSON($("#WF_FLOW_JSON_DATA").val()).flowVersion+")");
				if('<%=helper.getObjValue("WF_INSTANCE_UUID")%>'!='null' && '<%=helper.getObjValue("WF_INSTANCE_UUID")%>'!=''){
					//已办
					var jsonData_do=jQuery.parseJSON($("#WF_DO_JSON_DATA").val()==""?'{}':$("#WF_DO_JSON_DATA").val());
					var jsonData=jQuery.parseJSON($("#WF_FLOW_JSON_DATA").val());
					var i_left_length = 80;
					var num=1;
					for(var i=(jsonData_do.length -1);i>=0;i--){
						var tr_title="<tr><td align='center'>"+num+"</td><td>"+jsonData_do[i].USER_NAME+"</td><td>"+jsonData_do[i].OPERATER_AT+"</td><td>"+jsonData_do[i].CREATE_USER_NAME+"</td><td>"+jsonData_do[i].CREATE_AT+"</td>";
						
						tr_title+="<td>"+(jsonData_do[i].OPERATER_NAME==null?'[自动完成]':jsonData_do[i].OPERATER_NAME)+"</td>";
						tr_title+="<td>"+jsonData_do[i].USER_NAME+(jsonData_do[i].OPINION?jsonData_do[i].OPINION:"&nbsp;")+"</td></tr>";	
						
						var activty_obj=null;
						eval("activty_obj=jsonData.activity."+jsonData_do[i].ACTIVITY_ID);						
						var x=parseInt(activty_obj.x) -i_left_length;
						var y=parseInt(activty_obj.y);
						
						if($("#id_area_"+jsonData_do[i].ACTIVITY_ID).attr('id')){
							$("#id_area_"+jsonData_do[i].ACTIVITY_ID).attr('s_title',$("#id_area_"+jsonData_do[i].ACTIVITY_ID).attr('s_title').replace('</do_table>','')+tr_title+'</do_table>');
						}else{
							tr_title="<table border='1' cellpadding='0' cellspacing='0' width='100%'><tr height=20><td colspan='7' >【已办列表】：</td></tr><tr align='center'><td nowrap='nowrap'>步骤</td><td>操作人</td><td>操作时间</td><td>发送人</td><td>发送时间</td><td>操作结果</td><td>操作意见</td></tr>"+tr_title;
							$("#planetmap").append('<area onmouseout1="pop_info_del(\'id_area_'+jsonData_do[i].ACTIVITY_ID+'\');" onmouseover="pop_info(event,\'id_area_'+jsonData_do[i].ACTIVITY_ID+'\');" id="id_area_'+jsonData_do[i].ACTIVITY_ID+'" shape="rect" coords="'+ x+','+y+','+(x+32)+','+(y+32)+'" href="#1" s_title="'+tr_title+'</do_table>"');
						}
						num++;
					}
					//待办
					var jsonData_todo=jQuery.parseJSON($("#WF_TODO_JSON_DATA").val()==''?'{}':$("#WF_TODO_JSON_DATA").val());
					for(var i=(jsonData_todo.length -1);i>=0;i--){	
													
						var tr_html="<tr><td>"+jsonData_todo[i].SENDTO_NAME+"</td><td>";
						tr_html+=jsonData_todo[i].CREATE_USER_NAME+"</td><td>"+jsonData_todo[i].CREATE_AT+"</td></tr>";	
						
						var activty_obj=null;
						eval("activty_obj=jsonData.activity."+jsonData_todo[i].ACTIVITY_ID);							
						var x=parseInt(activty_obj.x) -i_left_length;
						var y=parseInt(activty_obj.y);						
						
						if($("#id_area_"+jsonData_todo[i].ACTIVITY_ID).attr('id')){
							if($("#id_area_"+jsonData_todo[i].ACTIVITY_ID).attr('s_title').indexOf('【待办列表】')<=-1){
								$("#id_area_"+jsonData_todo[i].ACTIVITY_ID).attr('s_title',$("#id_area_"+jsonData_todo[i].ACTIVITY_ID).attr('s_title')+"<br/><br/><table border='1' cellpadding='0' cellspacing='0' width='100%'><tr height=20><td colspan='3' style='background-color:#B848FF;'>【待办列表】：</td></tr><tr align='center'><td>接收人</td><td>发送人</td><td>发送时间</td></tr>");
							}
							$("#id_area_"+jsonData_todo[i].ACTIVITY_ID).attr('s_title',$("#id_area_"+jsonData_todo[i].ACTIVITY_ID).attr('s_title').replace('</table>','')+tr_html+'</table>');
						}else{
							$("#planetmap").append('<area onmouseout1="pop_info_del(\'id_area_'+jsonData_todo[i].ACTIVITY_ID+'\');" onmouseover="pop_info(event,\'id_area_'+jsonData_todo[i].ACTIVITY_ID+'\');" id="id_area_'+jsonData_todo[i].ACTIVITY_ID+'" shape="rect" coords="'+ (x)+','+(y-32)+','+(x+32)+','+(y+32)+'" href="#1" s_title="<table border=1 width=100% cellpadding=0 cellspacing=0><tr height=20><td colspan=3 >【待办列表】：</td></tr><tr align=center><td>接收人</td><td>发送人</td><td>发送时间</td></tr>'+tr_html+'</table>"');
						}
					}
				}
			}
			
			//$("#flow_graph_iframe").attr("src","<%=path%>/wflow/instance/wf_svg_graph.html");
			//$("#flow_graph_iframe").show();
			//$("#id_svg_image").attr("src",'HttpChannel?action=WFLOW_SHOW_SVG_IMAGE&WF_INSTANCE_UUID=<%=helper.getObjValue("WF_INSTANCE_UUID")%>&WF_FLOW_ID=<%=helper.getObjValue("WF_FLOW_ID") %>&WF_FLOW_VERSION=<%=helper.getObjValue("WF_FLOW_VERSION")%>');
			//$("#id_div_map").show();
		});

		
		//在鼠标显示一个层，该层的内空为div2的内容   
		function pop_info(evt,id){   
			var event=  window.event || evt;
			var div3 = document.getElementById('id_pop_info'); //将要弹出的层   
			div3.style.display="block"; //div3初始状态是不可见的，设置可为可见   
			div3.style.left=event.clientX+10; //鼠标目前在X轴上的位置，加10是为了向右边移动10个px方便看到内容   
			div3.style.top=event.clientY+5;   
			div3.style.position="absolute"; //必须指定这个属性，否则div3层无法跟着鼠标动   
			div3.innerHTML=$("#"+id).attr('s_title').replace('</do_table>','</table>');   
		}   

		function pop_info_del(id){   
			$("#id_pop_info").hide();
			$("#id_pop_info").html("");
		}   
		
	</script>




