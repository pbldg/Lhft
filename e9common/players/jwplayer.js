var myPlayer;
var jwPlayer = function (settings) {
	this.id = settings.id;
	this.type = settings.type;
	this.objwidth = settings.width;
	this.objheight = settings.height;
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
	this.start = settings.start;
};
jwPlayer.prototype.toString = function() {
	//<div id="myElement">Loading the player...</div>
	var s='<div id="'+this.id+'">Loading the player...</div>';
	return s;
};

jwPlayer.prototype.initPlayer = function(id){
	if(this.path==null){
		this.path = "";
	}
	$("#"+id).append(this.toString());
	myPlayer = jwplayer(this.id).setup({
		width : this.width,
		height : this.height,
        file: this.fileurl,
        image: this.imageurl
    });
};

jwPlayer.prototype.stop = function() {
	myPlayer.stop();
};

jwPlayer.prototype.play = function() {
	myPlayer.play();
};

jwPlayer.prototype.load = function() {
	myPlayer.load();
};

jwPlayer.prototype.pause = function() {
	myPlayer.pause();
};

jwPlayer.prototype.currentTime = function() {
	//return myPlayer.getDuration();
	return myPlayer.getPosition();
};

jwPlayer.prototype.getstate = function() {
	//return myPlayer.getDuration();
	return myPlayer.getState();
};

jwPlayer.prototype.duration = function() {
	return myPlayer.getDuration();
};

jwPlayer.prototype.seek = function(beginpo,endpos) {
	myPlayer.seek();
};