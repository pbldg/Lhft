<%@ page contentType="text/html; charset=gb2312" language="java"
	errorPage=""%>
<jsp:directive.page import="javax.servlet.http.Cookie" />
<jsp:directive.page import="java.util.Date" />
<jsp:directive.page import="com.xmzy.frameext.simpledb.DBDYPO" />

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
	response.addHeader("Pragma","no-cache");  
	response.setHeader("Cache-Control","no-cache");  
	response.setHeader("Expires","0");
			
	String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"> 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<title>��ӭʹ�ü�����֤�����¼ƽ̨��</title>
		<meta name="description"		content="" />
		<meta name="keywords"  			content="" />
		<meta name="copyright" 			content="" />
		
		<!-- Jquery--> 
		<script type="text/javascript" src="js/jquery-1.7.2.min.js" ></script>
		<script type="text/javascript" src="js/ajax.js" ></script>
		
		<link rel="stylesheet" type="text/css" media="all" href="themes/default/reset.css" />
		<link rel="stylesheet" type="text/css" media="all" href="themes/default/login.css" />
		<link rel="stylesheet" type="text/css" media="all" href="themes/default/blue.css" />
		
		<!-- comment extra.css for css validation -->
		<link rel="stylesheet" type="text/css" media="all" href="themes/default/extra.css" />

		<script type="text/javascript">
			var bNotCheckValidateNum = true;//�Ƿ��ж���֤��
			
			$(document).ready(function(){
				/*$('.toolTip .close').click(function(){
					$(this.parentNode).fadeOut(function(){
						$(this).remove();
					});
				});
				*/
				var h = $("#status").html();
				if(h!=null&&h!=""){
					alert(h);
					//$("#showinfo").html(h);
				}
			});
			
			function myEncodeURI(url){
				//��ʽ������WAS
			    //return url;
			    //����������Tomcat
			    return encodeURI(url);
			}
			function checkUserSubmit(){
				if (document.login_form.username.value==""){
					alert("�û�������Ϊ�գ�");
					document.login_form.username.focus();
					return false;
				}
				if (document.login_form.password.value==""){
					alert("���벻��Ϊ�գ�");
					document.login_form.password.focus();
					return false;
				}

				if (document.login_form.ValidateNumber.value==""){
					alert("��֤�벻��Ϊ�գ�");
					document.login_form.ValidateNumber.focus();
					return false;
				}
				var url = "HttpChannel?action=VERIFY_VALIDATENUM";
				var queryString = "ValidateNumber=" + document.login_form.ValidateNumber.value;
				
				document.getElementById("ShowLoadingMessage").style.display="";
				$.get(url,myEncodeURI(queryString),function(data){
					var str = data;
					document.getElementById('ShowLoadingMessage').style.display="none";
					
					if(bNotCheckValidateNum||str.indexOf("�ɹ�")>=0){
						document.login_form1.username.value = document.login_form.username.value;
						document.login_form1.password.value = document.login_form.password.value;
						document.login_form1.submit();
						return(false);
					}else{
						alert(str);
						$("#showinfo").html(str);
						document.getElementById("randomIMG").src="HttpChannel?action=GET_VALIDATENUM&rand=" + Math.random();
						return(false);
					}
				});

				return(false);
			}
		</script>
	</head>
		
	<body>
		
		<div class="boxLogin clearfix">
			 <!-- Tooltip styles  --> 
			<div class="toolTip tpRed clearfix" >
				<p>
					<img src="themes/img/icons/exclamation-red.png" alt="Tip!" />
					<span id="showinfo">�������û������������֤���¼.</span>
				</p>
				
				<a class="close" title="Close"></a>
			</div>
			
			<form name="login_form" method="post" onSubmit="checkUserSubmit();return(false);">
			
			<div class="fields">
				<p class="sep error">
					<label class="small" for="username">��&nbsp;&nbsp;����</label>
					<input type="text" name="username" class="sText" id="username" maxlength="32" autocomplete='off' style="width:180px;" value="test"/>
				</p>
				
				<p class="sep">
					<label class="small" for="password">��&nbsp;&nbsp;�룺</label>
					<input type="password" name="password" id="password" maxlength="32" autocomplete='off' class="sText" style="width:180px;" value="1"/>
				</p>
				
				<p class="sep">
					<label class="small" for="password">��֤�룺</label>
					<input name="ValidateNumber" type="text" class="sText" size="12" style="width:50px;" value="����">
						<img id="randomIMG"  align="absmiddle" style="cursor: pointer;" onClick="this.src='HttpChannel?action=GET_VALIDATENUM&rand=' + Math.random();" title="�����壿������»�ȡ��֤��">
						<script language="javascript">document.getElementById('randomIMG').src="HttpChannel?action=GET_VALIDATENUM&rand=" + Math.random();</script>
				</p>
				<div class="action">
					<input type="button" class="butDef" value="��¼" onClick="checkUserSubmit();return(false);"/>
				</div>
			</div>
			</form>
		</div>
		
		<form:form method="post" name="login_form1" id="login_form1" commandName="${commandName}" htmlEscape="true" style="display:none">
			<form:errors path="*" cssClass="errors" id="status" element="div" />
			<input type="hidden" name="lt" value="${flowExecutionKey}" />
			<input type="hidden" name="username"/>
			<input type="hidden" name="password"/>
			<input type="hidden" name="_eventId" value="submit" />
		</form:form>
		
		<span id="ShowLoadingMessage" style="display:none" >
			<div style="position:absolute;top:50%;left:50%;margin-left:-150px;margin-top:-80px;FILTER: Alpha(opacity=95);" >
				<table width="300" height="90" bgcolor="#306090" cellspacing="1" >
				  <tr>
				  <td align="center"  bgcolor="#FFFFFF" style="position:relative"><div style="z-index:5;font-size:12px;">ϵͳ������,���Ժ�...<br/><br/>
					 <img src="images/loading.gif"></div>
				  </td>
				 </tr>
				</table>
			</div>
		</span>
	</body>
</html>
