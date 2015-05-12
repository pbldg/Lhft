var myPlayer;
var pptPlayer = function (settings) {
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
pptPlayer.prototype.toString = function() {
	//<iframe src="/e9common/e9slide/e9slide.html" style="width:1024px;height:600px;"></iframe>
	var s='<iframe src="'+this.fileurl+'" style="width:' + this.width + 'px;height:' + this.height + 'px;"></iframe>';
	return s;
};
pptPlayer.prototype.initPlayer = function(id){
	$("#"+id).append(this.toString());
};

pptPlayer.prototype.stop = function() {
};

pptPlayer.prototype.play = function() {
};

pptPlayer.prototype.load = function() {
};

pptPlayer.prototype.pause = function() {
};

pptPlayer.prototype.currentTime = function() {
};

pptPlayer.prototype.seek = function(beginpo,endpos) {
};