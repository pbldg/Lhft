<%@ page contentType="text/html; charset=utf-8" language="java" errorPage=""%>
<jsp:directive.page import="javax.servlet.http.Cookie" />
<jsp:directive.page import="java.util.Date" />
<jsp:directive.page import="com.xmzy.frameext.simpledb.DBDYPO" />

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%
	response.addHeader("Pragma", "no-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Expires", "0");

	String path = request.getContextPath();
%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>E9统一认证单点登录平台！</title>
<meta name="description" content="益玖CAS" />
<meta name="keywords" content="益玖,单点登录" />
<meta name="copyright" content="E9RJ.COM" />

<link href="/e9common/metronic/media/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/e9common/metronic/media/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
<link href="/e9common/metronic/media/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="/e9common/metronic/media/css/style-metro.css" rel="stylesheet" type="text/css" />
<link href="/e9common/metronic/media/css/style.css" rel="stylesheet" type="text/css" />
<link href="/e9common/metronic/media/css/style-responsive.css" rel="stylesheet" type="text/css" />
<link href="/e9common/metronic/media/css/default.css" rel="stylesheet" type="text/css" id="style_color" />
<link href="/e9common/metronic/media/css/uniform.default.css" rel="stylesheet" type="text/css" />
<link href="css/login.css" rel="stylesheet" type="text/css" />

<link rel="shortcut icon" href="/e9common/favicon.ico" />
<script type="text/javascript" src="/e9common/jquery/js/jquery-1.7.2.min.js"></script>

<script type="text/javascript">
	var bNotCheckValidateNum = false;//是否不判断验证码
	var callbackurl_ = "";
	$(document).ready(function() {
		/*$('.toolTip .close').click(function(){
			$(this.parentNode).fadeOut(function(){
				$(this).remove();
			});
		});
		 */
		var h = $("#status").html();
		if (h != null && h != "") {
			$("#errmsg").html(h);
			$("#errmsgdiv").show();
		}
		$("#username").focus();
		$("#sourceurl").val("${param.service}");
		var username_ = "${param._username}";
		var password_ = "${param._password}";
		callbackurl_ = "${param._callbackurl}";
		if(username_ != "" && password_ != ""){
			$("#login_form #username").val(username_);
			$("#login_form #password").val(password_);
			$("#login_form #ValidateNumber").val("不输");
			checkUserSubmit();
			
		}
	});

	function myEncodeURI(url) {
		//正式环境：WAS
		//return url;
		//开发环境：Tomcat
		return encodeURI(url);
	}
	function checkUserSubmit() {
		/*if (document.login_form.username.value == "") {
			alert("用户名不能为空！");
			document.login_form.username.focus();
			return false;
		}
		if (document.login_form.password.value == "") {
			alert("密码不能为空！");
			document.login_form.password.focus();
			return false;
		}

		if (document.login_form.ValidateNumber.value == "") {
			alert("验证码不能为空！");
			document.login_form.ValidateNumber.focus();
			return false;
		}*/
		try{
			if($("#deptid option").size()>2){
				$('#deptid').rules('add',{required:true,messages:{required:"请选择部门"}});
			}else{
				$('#deptid').rules('remove',"required");
			}
		}catch(e){}
		
		if(!$('.login-form').validate().form()){
			return(false);
		};
		var url = "HttpChannel?action=CAS_VERIFY_VALIDATENUM";
		
		$("#loadingbg").show();
		$("#loading").show();
		$.get(url, $('#login_form').serialize(), function(data) {
			var str = data;
			$("#loading").hide();
			$("#loadingbg").hide();
			if (bNotCheckValidateNum || str.indexOf("成功") >= 0) {
				
				var usernameAndPwdStr = str.split("!")[1];
				var usernameAndPwd = usernameAndPwdStr.split(";")[0];//用户名和密码混合
				var secpwd = usernameAndPwdStr.split(";")[1];//加密串
				document.login_form1.username.value = usernameAndPwd;
				document.login_form1.password.value = secpwd;
				document.login_form1.deptid.value = $("#deptid").val();
				document.login_form1.submit();
				return (false);
			} else {
				$("#errmsg").html(str);
				$("#errmsgdiv").show();
				if(callbackurl_!=""){
					$("#callbackFrame").attr("src", encodeURI(encodeURI(callbackurl_+"?err="+str+"&date="+new Date())));
				}
				document.getElementById("randomIMG").src = "HttpChannel?action=GET_VALIDATENUM&width=80&height=33&rand="
						+ Math.random();
				return (false);
			}
		});

		return (false);
	}
	
	function getDeptList(){
		var url = "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=cas.userdept!getDeptByOpno&OPNO="+$("#username").val();
		if(""==$("#username").val()){
			return;
		}
		$.ajax({
		    type: 'POST',
		    url: url,
		    data: "",
		    success: success,
		    dataType: "json"

		});
	}
	function success(data){
		if(data!=null){
			$("#deptid").html("");
			$("#deptid").append("<option value=''>--请选择--</option>");
			$.each(data.Rows,function(i,item){
				var option = "<option value='"+item.DEPT_ID+"'>"+item.ORG_NAME+"-"+item.DEPT_NAME+"</option>";
				$("#deptid").append(option);				
			});
			if($("#deptid option").size()>2){
				$("#deptDiv").css("display","");
			}else{
				$("#deptid ").get(0).selectedIndex=1;  
				$("#deptDiv").css("display","none");
			}
		}
		
	}
</script>
</head>

<body class="login">
	<div class="logo">
		
	</div>

	<div class="content">
		<form class="form-vertical login-form" name="login_form" method="post" id="login_form" onsubmit="checkUserSubmit();return(false);">
			<div class="title">
				<img src="/e9common/metronic/media/image/e9logo.png" alt="" class="logoimg"/>E9 SSO 单点登录系统
			</div>
			<div class="space20"></div>
			
			<input type="hidden" name="sourceurl" id="sourceurl">

			<div class="alert alert-error hide" id="errmsgdiv">
				<span id="errmsg">请输入用户名、密码和验证码.</span>
			</div>

			<div class="control-group">
				<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
				<label class="control-label">用户名:</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i> <input class="m-wrap placeholder-no-fix" onblur="getDeptList()" type="text" placeholder="Username" name="username" id="username" />
					</div>
				</div>
			</div>

			<div class="control-group">
				<label class="control-label">密码:</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i> <input class="m-wrap placeholder-no-fix" type="password" placeholder="Password" name="password" id="password" />
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">验证码:</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-pencil"></i> <input class="m-wrap placeholder-no-fix" type="text" name="ValidateNumber" placeholder="Validate Number" id="ValidateNumber" style="width:180px;"/>
						<img id="randomIMG" style="vertical-align: middle; cursor: pointer;height:33px;" onClick="this.src='HttpChannel?action=GET_VALIDATENUM&width=80&height=33&rand=' + Math.random();" title="看不清？点击重新获取验证码">
					</div>
				</div>
				<script language="javascript">
					document.getElementById('randomIMG').src = "HttpChannel?action=GET_VALIDATENUM&width=80&height=33&rand="
							+ Math.random();
				</script>
			</div>

			<div id="deptDiv" class="control-group" style="display: none;">
				<label class="control-label">部门:</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i> <select id="deptid" name="deptid" style="width: 309px;padding-left: 30px;" class="m-wrap placeholder-no-fix"></select>
					</div>
				</div>
			</div>
			
			<div class="form-actions">
				<button type="submit" class="btn green" onclick="checkUserSubmit();return(false);">
					登 录 <i class="m-icon-swapright m-icon-white"></i>
				</button>
			</div>
			<div class="recommend">
				<h5>提示：</h5>
				<p>
					建议使用IE9及以上、<a href="http://firefox.com.cn/#download-fx" target="_blank">Firefox</a>、
					<a href="http://www.google.com/intl/zh-CN/chrome/" target="_blank">Google Chrome</a>等较新版本浏览器以获得最佳效果。
					点此<a href="/">到首页。</a>
				</p>

			</div>
		</form>
	</div>
	<div class="copyright">
		2012~<%=new java.text.SimpleDateFormat("yyyy").format(new java.util.Date())%> &copy; <a href="http://www.e9rj.com" target="_blank">福建益玖软件科技有限公司</a> 版权所有
	</div>
	<form:form method="post" name="login_form1" id="login_form1" commandName="${commandName}" htmlEscape="true" >
		<form:errors path="*" cssClass="errors" id="status" element="div" />
		<input type="hidden" name="lt" value="${flowExecutionKey}" />
		<input type="hidden" name="username" />
		<input type="hidden" name="password" />
		<input type="hidden" name="deptid" />
		<input type="hidden" name="_eventId" value="submit" />
	</form:form>

	<div id="loadingbg" class="hide"></div>
	
	<div id="loading" class="hide">
		系统处理中,请稍候...<br /> <br /> <img src="images/loading.gif">
	</div>
	<iframe id="callbackFrame" style="display: none;"></iframe>
	<script src="/e9common/metronic/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="/e9common/metronic/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="/e9common/metronic/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="/e9common/metronic/media/js/bootstrap.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
	<script src="/e9common/metronic/media/js/excanvas.min.js"></script>
	<script src="/e9common/metronic/media/js/respond.min.js"></script>  
	<![endif]-->   
	<script src="/e9common/metronic/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="/e9common/metronic/media/js/jquery.backstretch.min.js" type="text/javascript"></script> 
	<script src="/e9common/metronic/media/js/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="/e9common/metronic/media/js/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="/e9common/metronic/media/js/jquery.uniform.min.js" type="text/javascript" ></script>
	<script src="/e9common/metronic/media/js/jquery.validate.min.js" type="text/javascript"></script>
	<script src="/e9common/metronic/media/js/app.js" type="text/javascript"></script>
	<script src="js/login.js" type="text/javascript"></script>      
	<script>
		jQuery(document).ready(function() {     
		  App.init();
		  Login.init();
		  
		  $.backstretch([
				"/e9common/metronic/media/image/bg/8.jpg",
		 		"/e9common/metronic/media/image/bg/5.jpg",
		 		"/e9common/metronic/media/image/bg/6.jpg",
		 		"/e9common/metronic/media/image/bg/7.jpg",
		 		"/e9common/metronic/media/image/bg/4.jpg",
		 		"/e9common/metronic/media/image/bg/3.jpg"
		 		], {
		 		fade: 1000,
		 		duration: 8000
			});
		});
	</script>
</body>
</html>
