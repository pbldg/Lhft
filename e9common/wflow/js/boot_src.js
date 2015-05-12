var g_flag="src"; //src、min

var g_jsArray=new Array("activityInfo","flowInfo","main","nextActivityLineInfo","operaterInfo","propertyInfo","context","flow_graph");
var g_bootJavascript="js/"+g_flag+"/"+g_jsArray[g_js_num]+".js";

if(g_jsArray[g_js_num]!="context"){	
	document.write('<script src="../js/jquery-1.7.2.min.js" type="text/javascript"></sc' + 'ript>');
	if(g_jsArray[g_js_num]=='main'){
		document.write('<script src="../' + g_bootJavascript.replace('main.js','svg_common.js') + '" type="text/javascript"></sc' + 'ript>');
	}
	if(g_jsArray[g_js_num]=='flow_graph'){
		document.write('<script src="../' + g_bootJavascript.replace('flow_graph.js','svg_common.js') + '" type="text/javascript"></sc' + 'ript>');
	}
	document.write('<script src="'+g_bootJavascript + '" type="text/javascript"></sc' + 'ript>');
	document.write('<link href="../css/style.css" rel="stylesheet" type="text/css" />');
}else{
	var g_svgNs = 'http://www.w3.org/2000/svg';
	var g_xlinkNs='http://www.w3.org/1999/xlink';
	var g_script = document.createElementNS(g_svgNs, 'script');
	g_script.setAttributeNS(null, 'type', 'text/ecmascript');
	g_script.setAttributeNS(g_xlinkNs, 'xlink:href', g_bootJavascript);
	document.documentElement.appendChild(g_script);	
}

