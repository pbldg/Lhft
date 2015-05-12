<%-- 
    Document   : redirect
    Created on : 2011-1-11, 17:42:09
    Author     : Kenny
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <script type="text/javascript">
        	//这里转向有问题，直接从CAS登录页面来的验证，要到一个应用的链接页面。或者提示从应用登录。
            var defLoginURL = 'http://localhost:8080/etms';//这样配置有问题，应该到一个静态选择页面来跳转
            function redirect(){
                var _window = top.location != self.location? window.parent.window : window;
                var serviceURL = getParam('service', _window);
                if(!serviceURL){
                    //serviceURL = defLoginURL;
                    alert("请从应用系统登录！");
                    return;
                }
                
                _window.location.href = 'login?service='+serviceURL;
            }
            function getParam(name, _window) {
                _window ? _window : window;
                var queryString = _window.location.search;
                var param = queryString.substr(1, queryString.length - 1).split("&");
                for (var i = 0; i < param.length; i++) {
                    var keyValue = param[i].split("=");
                    if (keyValue[0] == name) return keyValue[1];
                }
                return null;
            }
        </script>
    </head>
    <body onload="redirect()">

    </body>
</html>