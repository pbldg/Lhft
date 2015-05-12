jQuery.extend(jQuery, {
  // jQuery UI alert弹出提示
	uialert: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deletePopDiv("dialog-alert");
		  }catch(err){
			  
		  }
	    var html =
	    '<div class="dialog" id="dialog-alert">' +
	    '  <p>' +
	    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 0 0;"></span>' + text +
	    '  </p>' +
	    '</div>';
	    return window.top.$(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: true,
	      show: {
	        effect: 'fade',
	        duration: 300
	      },
	      title: title || "提示信息",
	      close: function(event, ui) {
	          $(this).remove(); // 关闭时销毁
	      },
	      buttons: {
	        "确定": function() {
	          var dlg = window.top.$(this).dialog("close");
	          fn && fn.call(dlg);
	        }
	      }     
	    });
	  },
	  uihelp: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deletePopDiv("dialog-help");
		  }catch(err){
			  
		  }
		  var html =
			  '<div class="dialog" id="dialog-help">' +
			  '  <p>' +
			  '    <span style="float: left; margin: 0 7px 0 0;"></span>' + text +
			  '  </p>' +
			  '</div>';
		  return window.top.$(html).dialog({
			  //autoOpen: false,
			  resizable: false,
			  modal: true,
			  show: {
				  effect: 'fade',
				  duration: 300
			  },
			  title: title || "帮助信息",
			  close: function(event, ui) {
				  $(this).remove(); // 关闭时销毁
			  },
			  buttons: {
				  "确定": function() {
					  var dlg = window.top.$(this).dialog("close");
					  fn && fn.call(dlg);
				  }
			  }     
		  });
	  },
	  uishowvalidate: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deleteDiv("dialog-validate");
		  }catch(err){
			  
		  }
	    var html =
	    '<div class="dialog" id="dialog-validate" >' +
	    '  <p>' +
	    	text +
	    '  </p>' +
	    '</div>';
	    return $(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: true,
	      width: 400,
	      dialogClass:"validate-dialog",
	      show: {
	        effect: 'fade',
	        duration: 300
	      },
	      title: title || "提示信息",
	      close: function(event, ui) {
	          $(this).remove(); // 关闭时销毁
	      }    
	    });
	  },	  
	uierror: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deletePopDiv("dialog-error");
		  }catch(err){
			  
		  }
	    var html =
	    '<div class="dialog" id="dialog-error">' +
	    '  <p>' +
	    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 0 0;"></span>' + text +
	    '  </p>' +
	    '</div>';
	    return window.top.$(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: true,
	      show: {
	        effect: 'fade',
	        duration: 300
	      },
	      title: title || "提示信息",
	      close: function(event, ui) {
	          $(this).remove(); // 关闭时销毁
	      },
	      buttons: {
	        "确定": function() {
	          var dlg = window.top.$(this).dialog("close");
	          fn && fn.call(dlg);
	        }
	      }     
	    });
	  },	  
	  uimessage: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deletePopDiv("dialog-message3");
		  }catch(err){
			  
		  }
	    var html =
	    '<div class="dialog" id="dialog-message3">' +
	    '  <p>' +
	    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 0 0;"></span>' + text +
	    '  </p>' +
	    '</div>';
	    
	    var $dia = window.top.$(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: false,
	      show: {
	        effect: 'bounce',
	        times:1,
	        duration: 1000
	      },
	      //title: title || "提示信息",
	      close: function(event, ui) {
	          //$(this).remove(); // 关闭时销毁
	      },
	      height: 90,
	      position:['center','top'],
          hide: {
  	        effect: 'explode',
  	        duration: 1000
  	      },
          open: function( event, ui ) {
        	  window.setTimeout(function(ui){
    			  $dia.dialog( "close" );
        		  fn && fn.call();
  	    },500);
          }
	    });
	    return $dia;
	  },
	  //从当前窗口弹出提示
	  uiselfmessage: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deletePopDiv("dialog-message");
		  }catch(err){
			  
		  }
	    var html =
	    '<div class="dialog" id="dialog-message" z-index="9999999">' +
	    '  <p z-index="9999999">' +
	    '    <span z-index="9999999" class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 0 0;"></span>' + text +
	    '  </p>' +
	    '</div>';
	    
	    var $dia = $(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: false,
	      show: {
	        effect: 'bounce',
	        times:1,
	        duration: 1000
	      },
	      //title: title || "提示信息",
	      close: function(event, ui) {
	          //$(this).remove(); // 关闭时销毁
	      },
	      height: 90,
	      position:['center','top'],
          hide: {
  	        effect: 'explode',
  	        duration: 1000
  	      },
          open: function( event, ui ) {
        	  window.setTimeout(function(ui){
        			  $dia.dialog( "close" );
            		  fn && fn.call();
      	    },500);
          }
	    });
	    return $dia;
	  },
	  uisuccess: function(text, title, fn) {
		  try{
			  //删除原来有的层
			  deletePopDiv("dialog-message");
			  fn && fn.call();
		  }catch(err){
			  
		  }
	    var html =
	    '<div class="dialog" id="dialog-success">' +
	    '  <p>' +
	    '    <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 0 0;"></span>' + text +
	    '  </p>' +
	    '</div>';
	    return window.top.$(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: true,
	      show: {
	        effect: 'fade',
	        duration: 300
	      },
	      title: title || "提示信息",
	      close: function(event, ui) {
	          $(this).remove(); // 关闭时销毁
	      },
	      buttons: {
	        "确定": function() {
	          var dlg = window.top.$(this).dialog("close");
	          fn && fn.call(dlg);
	        }
	      }     
	    });
	  },
  jqalert: function(text, title, fn) {
	    var html =
	    '<div class="dialog" id="dialog-message">' +
	    '  <p>' +
	    '    <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 0 0;"></span>' + text +
	    '  </p>' +
	    '</div>';
	    return $(html).dialog({
	      //autoOpen: false,
	      resizable: false,
	      modal: true,
	      show: {
	        effect: 'fade',
	        duration: 300
	      },
	      title: title || "提示信息",
	      close: function(event, ui) {
	          $(this).remove(); // 关闭时销毁
	      },
	      buttons: {
	        "确定": function() {
	          var dlg = $(this).dialog("close");
	          fn && fn.call(dlg);
	        }
	      }     
	    });
	  },
  // jQuery UI alert弹出提示,一定间隔之后自动关闭
  jqtimeralert: function(text, title, fn, timerMax) {
    var dd = $(
    '<div class="dialog" id="dialog-message">' +
    '  <p>' +
    '    <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 0 0;"></span>' + text +
    '  </p>' +
    '</div>');
    dd[0].timerMax = timerMax || 3;
    return dd.dialog({
      //autoOpen: false,
      resizable: false,
      modal: true,
      show: {
        effect: 'fade',
        duration: 300
      },
      open: function(e, ui) {
        var me = this,
          dlg = $(this),
          btn = dlg.parent().find(".ui-button-text").text("确定(" + me.timerMax + ")");
        --me.timerMax;
        me.timer = window.setInterval(function() {
          btn.text("确定(" + me.timerMax + ")");
          if (me.timerMax-- <= 0) {
            dlg.dialog("close");
            fn && fn.call(dlg);
            window.clearInterval(me.timer); // 时间到了清除计时器
          }
        }, 1000);
      },
      title: title || "提示信息",
      buttons: {
        "确定": function() {
          var dlg = $(this).dialog("close");
          fn && fn.call(dlg);
          window.clearInterval(this.timer); // 清除计时器
        }
      },
      close: function() {
        window.clearInterval(this.timer); // 清除计时器
        $(this).remove(); // 关闭时销毁
      }
    });
  },
  // jQuery UI confirm弹出确认提示
  uiconfirm: function(text, title, fn1, fn2) {
	  try{
		  //删除原来有的层
		  deletePopDiv("dialog-confirm");
	  }catch(err){
		  
	  }
    var html =
    '<div class="dialog" id="dialog-confirm">' +
    '  <p>' +
    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +
    '  </p>' +
    '</div>';
    return window.top.$(html).dialog({
      //autoOpen: false,
      resizable: false,
      close: function(event, ui) {
          $(this).remove(); // 关闭时销毁
      },
      modal: true,
      show: {
        effect: 'fade',
        duration: 300
      },
      title: title || "提示信息",
      buttons: {
        "确定": function() {
          var dlg = window.top.$(this).dialog("close");
          fn1 && fn1.call(dlg, true);
        },
        "取消": function() {
          var dlg = window.top.$(this).dialog("close");
          fn2 && fn2(dlg, false);
        }
      }
    });
  },
//jQuery UI confirm弹出确认提示
  uiyesorno: function(text, title, fn1, fn2,fn3) {
	  try{
		  //删除原来有的层
		  deletePopDiv("dialog-yesorno");
	  }catch(err){
		  
	  }
    var html =
    '<div class="dialog" id="dialog-yesorno">' +
    '  <p>' +
    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +
    '  </p>' +
    '</div>';
    return window.top.$(html).dialog({
      //autoOpen: false,
      resizable: false,
      close: function(event, ui) {
          $(this).remove(); // 关闭时销毁
      },
      modal: true,
      show: {
        effect: 'fade',
        duration: 300
      },
      title: title || "提示信息",
      buttons: {
        "是": function() {
          var dlg = window.top.$(this).dialog("close");
          fn1 && fn1.call(dlg, true);
        },
        "否": function() {
          var dlg = window.top.$(this).dialog("close");
          fn2 && fn2(dlg, false);
        },
        "取消": function() {
            var dlg = window.top.$(this).dialog("close");
            fn3 && fn3(dlg, false);
        }
      }
    });
  },
  //jQuery UI confirm弹出确认提示，从本窗口弹出
  selfconfirm: function(text, title, fn1, fn2) {
    var html =
    '<div class="dialog" id="dialog-confirm">' +
    '  <p>' +
    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +
    '  </p>' +
    '</div>';
    return $(html).dialog({
      //autoOpen: false,
      resizable: false,
      close: function(event, ui) {
          $(this).remove(); // 关闭时销毁
      },
      modal: true,
      show: {
        effect: 'fade',
        duration: 300
      },
      title: title || "提示信息",
      buttons: {
        "确定": function() {
          var dlg = $(this).dialog("close");
          fn1 && fn1.call(dlg, true);
        },
        "取消": function() {
          var dlg = $(this).dialog("close");
          fn2 && fn2(dlg, false);
        }
      }
    });
  },
  uiprompt: function(text, title, fn1, fn2, bStyle) {
	try{
		//删除原来有的层
		deletePopDiv("prompt-confirm");
	}catch(err){

	}
    var html ="";
    if(bStyle==null||bStyle==undefined){
    	html = '<div class="dialog" id="prompt-confirm">' +
        '  <p>' +
        '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +
        '  </p>' +
        '  <p>' +
        '    <input type="text" id="prompt-input" style="padding:0.4em;width:95%;">'+
        '  </p>' +
        '</div>';
    }else{
    	html = '<div class="dialog" id="prompt-confirm">' +
        '  <p>' +
        '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +
        '  </p>' +
        '  <p>' +
        '    <textarea id="prompt-input" rows="4" style="padding:0.4em;width:95%;"/>'+
        '  </p>' +
        '</div>';
    }
    
    return window.top.$(html).dialog({
      //autoOpen: false,
      resizable: false,
      close: function(event, ui) {
          $(this).remove(); // 关闭时销毁
      },
      modal: true,
      show: {
        effect: 'fade',
        duration: 300
      },
      title: title || "提示信息",
      buttons: {
        "确定": function(promptValue) {
        	promptValue = window.top.$("#prompt-confirm").contents().find("#prompt-input").val();
            var dlg = window.top.$(this).dialog("close");
            fn1 && fn1.call(dlg, promptValue);
        },
        "取消": function() {
            var dlg = window.top.$(this).dialog("close");
            fn2 && fn2(dlg, false);
        }
      }
    });
  },
  uiprompt2: function(text, title,oldmain,oldedit, fn1, fn2) {
	  try{
		  //删除原来有的层
		  deletePopDiv("prompt-confirm");
	  }catch(err){
		  
	  }
    var html =
    '<div class="dialog" id="prompt-confirm">' +
    '  <p>' +
    '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text +
    '  </p>' +
    '  <p>' +
    '    mainform：<input type="text" id="prompt-input1" style="padding:0.4em;width:95%;" value="'+oldmain+'">'+
    '  </p>' +
    '  <p>' +
    '    editform：<input type="text" id="prompt-input2" style="padding:0.4em;width:95%;" value="'+oldedit+'">'+
    '  </p>' +    
    '</div>';
    return window.top.$(html).dialog({
      //autoOpen: false,
      resizable: false,
      close: function(event, ui) {
          $(this).remove(); // 关闭时销毁
      },
      modal: true,
      show: {
        effect: 'fade',
        duration: 300
      },
      title: title || "提示信息",
      buttons: {
        "确定": function(promptValue) {
        	promptValue = window.top.$("#prompt-confirm").contents().find("#prompt-input1").val()+","+window.top.$("#prompt-confirm").contents().find("#prompt-input2").val();
            var dlg = window.top.$(this).dialog("close");
            fn1 && fn1.call(dlg, promptValue);
        },
        "取消": function() {
            var dlg = window.top.$(this).dialog("close");
            fn2 && fn2(dlg, false);
        }
      }
    });
  },
  // jQuery UI 弹出iframe窗口
  jqopen: function(url, options , title) {
	if(title==null){
		title = "提示信息";
	}
    var html =
    '<div class="dialog" id="dialog-window" title='+title+'>' +
    ' <iframe src="' + url + '" frameBorder="0" style="border: 0; " scrolling="auto" width="100%" height="100%"></iframe>' +
    '</div>';
    return $(html).dialog($.extend({
      modal: true,
      closeOnEscape: true,
      draggable: false,
      resizable: false,
      close: function(event, ui) {
        $(this).remove(); // 关闭时销毁
      }
    }, options));
  },
  //jQuery UI 从顶层弹出iframe窗口
  jqTopOpen: function(url, options) {
	  try{
		  //删除原来有的层
		  deletePopDiv("dialog-window");
	  }catch(err){
		  
	  }
	  
    var html =
    '<div class="dialog" id="dialog-window" style="padding-left:0px;padding-right:0px;" title="提示信息">' +
    ' <iframe src="' + url + '" frameBorder="0" style="border: 0; " id="topIframe" scrolling="auto" width="100%" height="99%"></iframe>' +
    '</div>';
    return window.top.$(html).dialog($.extend({
      modal: true,
      closeOnEscape: true,
      draggable: false,
      resizable: false,
      close: function(event, ui) {
    		$(this).find("#topIframe").contents().find(".swfupload").remove();
    		  
    	  //alert($(this).remove());
    	  //$('#dialog-window', window.parent.document).remove();
    	  //alert($(html).empty())
    	  //alert($("#topIframe").html());
    	  //alert(window.top.$("#dialog-window").find("#topIframe").find(".swfupload").attr("id"));
    	 
      }
    }, options));
  },
  jqPopWindow: function(id,url, options) {
	  try{
		  //删除原来有的层
		  deletePopDiv(id);
	  }catch(err){
		  
	  }
	  
    var html =
    '<div class="dialog" id="'+id+'" style="padding-left:0px;padding-right:0px;" title="提示信息">' +
    ' <iframe src="' + url + '" frameBorder="0" style="border: 0; " id="'+id+'Iframe" scrolling="auto" width="100%" height="99%"></iframe>' +
    '</div>';
    return window.top.$(html).dialog($.extend({
      modal: true,
      closeOnEscape: true,
      draggable: false,
      resizable: false,
      close: function(event, ui) {
    	  //alert($(this).remove());
    	  //$('#dialog-window', window.parent.document).remove();
    	  //alert($(html).empty())
    	  $(this).find("#"+id+"Iframe").contents().find(".swfupload").remove();
      }
    }, options));
  },
  uiPopWindow: function(id,url, options) {
	  try{
		  //删除原来有的层
		  deletePopDiv(id);
	  }catch(err){
		  
	  }
	  
    var html =
    '<div class="dialog" id="'+id+'" style="padding-left:0px;padding-right:0px;" title="提示信息">' +
    ' <iframe src="' + url + '" frameBorder="0" style="border: 0; " id="'+id+'Iframe" scrolling="auto" width="100%" height="99%"></iframe>' +
    '</div>';
    return window.top.$(html).dialog($.extend({
      modal: true,
      closeOnEscape: true,
      draggable: false,
      resizable: false,
      close: function(event, ui) {
    	  //alert($(this).remove());
    	  //$('#dialog-window', window.parent.document).remove();
    	  //alert($(html).empty())
    	  $(this).find("#"+id+"Iframe").contents().find(".swfupload").remove();
      }
    }, options));
  },
  // jQuery UI confirm提示
  confirm: function(evt, text, title) {
    evt = $.event.fix(evt);
    var me = evt.target;
    if (me.confirmResult) {
      me.confirmResult = false;
      return true;
    }
    jQuery.jqconfirm(text, title, function(e) {
      me.confirmResult = true;
      if (e) {
        if (me.href && $.trim(me.href).indexOf("javascript:") == 0) {
          $.globalEval(me.href);
          me.confirmResult = false;
          return;
        }
        var t = me.type && me.type.toLowerCase();
        if (t && me.name && (t == "image" || t == "submit" || t == "button")) {
          __doPostBack(me.name, "");
          me.confirmResult = false;
          return;
        }
        if (me.click) me.click(evt);
      }
      return false;
    });
    return false;
  }
});