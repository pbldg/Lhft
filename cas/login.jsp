<%@ page language="java" contentType="text/html; charset=gbk" pageEncoding="gbk"%>
<%@ page session="true" %>
<% //��ҳ���ݲ�ʹ��
	if(1==1) return; %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk">
    <title>Զ��CAS�ͻ��˵�½ҳ��</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/main.css" />
    <script type="text/javascript" src="js/clientLogin.js"> </script>
</head>
<body>
    <h1>Զ��CAS�ͻ��˵�½ҳ��</h1>
   
    <% if (request.getRemoteUser() == null) { %>
        <div id="errorMessage"></div>
        <form id="myLoginForm" action="login" method="post">
            <input type="hidden" id="service" name="service" value="">
            <input type="hidden" name="loginUrl" value="login.jsp">
            <input type="hidden" name="submit" value="true" />
            <table>
                <tr>
                    <td>�û���:</td>
                    <td><input type="text" id="username" name="username"></td>
                </tr>
                <tr>
                    <td>��&nbsp;&nbsp;��:</td>
                    <td><input type="password" id="password" name="password"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="button" value="��½" id="loginButt" /></td>
                </tr>
            </table>
        </form>
        <iframe style="display:none;" src="" name="cas_serverFrame"  id="cas_serverFrame" ></iframe>
        <script type="text/javascript">
            loadedIFrame(window.event);
        </script>
    <% } else { %>
        <div class="welcome">���ã�<%= request.getRemoteUser() %></div>
        <div id="logout">
            <a href="logout?service=login.jsp">����ǳ�</a>
        </div>
    <% } %>
</body>
</html>