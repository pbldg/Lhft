var myPlayer;
function viewer(settings){
	this.id = settings.id;
	this.type = settings.type;
	this.objwidth = settings.objwidth;
	this.objheight = settings.objheight;
	this.width = settings.width;
	this.height = settings.height;
	this.fileurl = settings.fileurl;
	this.nextfileurl = settings.nextfileurl;
	this.imageurl = settings.imageurl;
	this.nextimageurl = settings.nextimageurl;
	this.ccurl = settings.ccurl;
	this.nextccurl = settings.nextccurl;
	this.preload = settings.preload;
	this.poster = settings.poster;
	this.beforePlay = settings.beforePlay;
	this.endPlay = settings.endPlay;
	this.title = settings.title;
	this.path = settings.path;
	this.loop = settings.loop;
};

viewer.prototype.toString = function() {

	var s="<object align=\"middle\""
	+"	classid=\"CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95\""
	+"	class=\"OBJECT\" id=\""+this.id+"\" width=\""+this.objwidth+"\" height=\""+this.objheight+"\">"
	+"	<param name=\"ShowStatusBar\" value=\"1\">"
	+"	<param name=\"AutoStart\" value=\"1\">"
	+"	<param name=\"Filename\" value=\""+this.fileurl+"\">"
	+"	<param name=\"CurrentPosition\" value=\"0\">"
	+"</object>";

	return s;
};

jwPlayer.prototype.initPlayer = function(id){
	if(this.path==null){
		this.path = "";
	}
	$("#"+id).append(this.toString());
};

viewer.prototype.stop = function() {
	try{
		$(this.id).stop();	
	}catch(e){
	}
};

viewer.prototype.start = function() {
	try{
		$(this.id).Filename = this.fileurl;
		$(this.id).play();	
	}catch(e){
		alert("播放失败!\r\n\r\n错误信息为："+e.message);
	}
};

viewer.prototype.pause = function() {
	try{
		$(this.id).pause();	
	}catch(e){
	}
};

viewer.prototype.seek = function(beginpos,endpos) {
	try{
		$(this.id).stop();
		//定位到主文件中播放
		//if($(this.id).Filename != this.fileurl){
		//	$(this.id).Filename = this.fileurl;
		//}
		
		var i_CurrentPosition = parseInt(beginpos.substr(0,2)) * 60 * 60 + parseInt(beginpos.substr(3,2)) * 60 + parseInt(beginpos.substr(6,2));
		$(this.id).CurrentPosition=i_CurrentPosition;
		//alert("点击开始播放文件!");
		$(this.id).play();
	}catch(e){
		alert("定位播放失败!\r\n\r\n错误信息为："+e.message);
	}
};