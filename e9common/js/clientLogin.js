    var constants = {  
        loginButt : 'loginButt',  
        clientLoginForm : 'myLoginForm',  
        casServerFrame : 'cas_serverFrame',  
        loginFormUser : 'username',  
        loginFormPassword : 'password',  
        loginFormValidateNum : 'ValidateNumber',
        serverLoginFormId : 'login_form',  
        redirectURLName : 'service',  
        redirectUrl : '',
        loginURL : '',  
        casServerURL : ''
    }  
      
    function initEvents(e){  
        var loginButtEl = document.getElementById(constants.loginButt);  
        if(loginButtEl){  
            registerListener(loginButtEl, 'click', loginCAS);  
        }  
        var loginFormEl = document.getElementById(constants.clientLoginForm);  
        if(loginFormEl){  
            registerListener(loginFormEl, 'keydown', function(e){  
                if(isKeyDownEnter(e)){  
                    loginCAS();  
                }  
            });  
        }  
    }  
      
    loginCAS  = function(){  
    	if (document.getElementById(constants.loginFormUser).value==""){
			alert("用户名不能为空！");
			document.getElementById(constants.loginFormUser).focus();
			return false;
		}
		if (document.getElementById(constants.loginFormPassword).value==""){
			alert("密码不能为空！");
			document.getElementById(constants.loginFormPassword).focus();
			return false;
		}
		
		if (document.getElementById(constants.loginFormValidateNum).value==""){
			alert("验证码不能为空！");
			document.getElementById(constants.loginFormValidateNum).focus();
			return false;
		}

		var username = document.getElementById(constants.loginFormUser).value;  
        var password = document.getElementById(constants.loginFormPassword).value;  
        $("#"+constants.casServerFrame).attr("src",constants.casServerURL+"?service="+constants.loginURL+"&_username="+username+"&_password="+password+"&_callbackurl="+constants.callbackUrl);
    
    }  
      
    function resetWindow(){  
        if (top.location !== self.location) {  
            top.location = self.location;  
        }  
    }  
      
    function loadedIFrame(e){  
    	initEvents(e); 
    }  
      
    function registerListener(el, eventName, handle) {  
        if (window.attachEvent) {  
            el.attachEvent('on' + eventName, handle);  
        } else if (window.addEventListener) {  
            el.addEventListener(eventName, handle, false);  
        }  
    }  
      
    function isKeyDownEnter(e) {  
        e = e ? e : window.event;  
        var _isie = (window.attachEvent) ? true : false;  
        var _key = '';  
        if (_isie) {  
            _key = e.keyCode;  
        } else {  
            _key = e.which;  
        }  
        if (_key == 13)  
            return true;  
        else  
            return false;  
    }  
      
    function getParam(name) {  
        var queryString = window.location.search;  
        var param = queryString.substr(1, queryString.length - 1).split("&");  
        for (var i = 0; i < param.length; i++) {  
            var keyValue = param[i].split("=");  
            if (keyValue[0] == name) return keyValue[1];  
        }  
        return null;  
    }  