var sPlayer;
var swfPlayer = function (settings) {
	this.id = settings.id;
	this.type = settings.type;
	this.objwidth = settings.objwidth;
	this.objheight = settings.objheight;
	this.width = settings.width;
	this.height = settings.height;
	this.fileurl = settings.fileurl;
	this.nextfileurl = settings.nextfileurl;
	this.imageurl = settings.imageurl;
	this.preload = settings.preload;
	this.poster = settings.poster;
	this.beforePlay = settings.beforePlay;
	this.title = settings.title;
	this.path = settings.path;
};
swfPlayer.prototype.toString = function() {
	/*<div id="flashContent"> 
	</div>*/
	var s='';
	s += '<div id="flashContent">\r\n';
	s += '<a href="http://www.adobe.com/go/getflashplayer">\r\n';
	s += '<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" /></a>'; 
	s += '</div>';
	return s;
};

swfPlayer.prototype.initPlayer = function(id){
	$("#"+id).append(this.toString());
	//<!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
    var swfVersionStr = "9.0.124";
    //<!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
    var xiSwfUrlStr = "${expressInstallSwf}";
    var flashvars = { 
          SwfFile : decodeURI(this.fileurl),
		  Scale : 1.0, 
		  ZoomTransition : "easeOut",
		  ZoomTime : 0.5,
			  ZoomInterval : 0.1,
			  FitPageOnLoad : false,
			  FitWidthOnLoad : false,
			  PrintEnabled : true,
			  FullScreenAsMaxWindow : false,
		  ProgressiveLoading : true,
		  
		  PrintToolsVisible : true,
			  ViewModeToolsVisible : true,
			  ZoomToolsVisible : true,
			  FullScreenVisible : true,
			  NavToolsVisible : true,
			  CursorToolsVisible : true,
			  SearchToolsVisible : true,
			  
			  localeChain: "en_US"
		  };
	 var params = {
		
	    };
    params.quality = "high";
    params.bgcolor = "#ffffff";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    var attributes = {};
    attributes.id = "FlexPaperViewer";
    attributes.name = "FlexPaperViewer";
    swfobject.embedSWF(
        "/e9common/players/swfplayer/FlexPaperViewer.swf", "flashContent", 
        this.width, this.height,
        swfVersionStr, xiSwfUrlStr, 
        flashvars, params, attributes);
	swfobject.createCSS("#flashContent", "display:block;text-align:left;");
};
swfPlayer.prototype.stop = function() {
	
};

swfPlayer.prototype.play = function() {
	
};

swfPlayer.prototype.load = function() {
	
};

swfPlayer.prototype.pause = function() {
	
};

swfPlayer.prototype.seek = function(beginpo,endpos) {

};