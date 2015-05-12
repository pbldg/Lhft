var myPlayer;
var mediaPlayer = function (settings) {
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
mediaPlayer.prototype.toString = function() {
	//<video id="mediaPlayer" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"></video>
	var s='<video id="'+this.id+
		'" class="video-js vjs-default-skin" controls preload="'+(this.preload==null?'none':this.preload)+ ' autoplay loop '+
		'" width="'+(this.width==null?600:this.width)+'" height="'+(this.height==null?264:this.height)+'" data-setup={"loop": "true"}>'
		if(this.ccurl && this.ccurl!=""){
			s += ' <track id="track1" kind="captions" src="'+this.ccurl+'" srclang="zh" label="中文字幕"></track>';
		}
		if(this.fileurl.indexOf("rtmp")==0){
			s += '<source src="'+this.fileurl+'" type="rtmp/mp4"/>';
		}
		s += '</video>';
	return s;
};
mediaPlayer.prototype.initPlayer = function(id){
	try{
		videojs(this.id).dispose(); 
	}catch(e){
		
	}
	if(this.path==null){
		this.path = "";
	}
	$("#"+id).append(this.toString());
	myPlayer = null;
	myPlayer = document.getElementById(this.id);
	myPlayer.setAttribute("src", this.path + this.fileurl);
	//myPlayer.setAttribute("type", "rtmp/mp4");
	
	myPlayer.setAttribute("poster",this.path + this.imageurl);
	myPlayer = videojs(this.id);
	myPlayer.showTextTrack("track1","captions");
	var nexturl = this.path + this.nextfileurl;
	var cid = this.id;
	var beforePlay = this.beforePlay;
	var endPlay = this.endPlay;
	var obj = this;
	var nextccurl = this.nextccurl;
	var loop = this.loop;
	var fileurl = this.fileurl;
	videojs(this.id).ready(function(){
		if((nexturl && nexturl!="") || (endPlay && endPlay!="") || (loop)){
			this.on("ended", function(){
				if(endPlay && endPlay!="" && endPlay!='undefined'){
					endPlay(obj);
				}
				if(nexturl && nexturl!="" && nexturl!='undefined'){
					myPlayer.src( nexturl);
					myPlayer.load();
					myPlayer.play();
				}
				if(loop && loop!='undefined'){
					myPlayer.src( fileurl);
					myPlayer.load();
					myPlayer.play();
				}
			});
		}
		if(beforePlay && beforePlay!="" && beforePlay!="undefined"){
			this.on("loadstart", function(){
				beforePlay(obj);
			});
		}
	});
};

mediaPlayer.prototype.stop = function() {
	myPlayer.stop();
};

mediaPlayer.prototype.play = function() {
	myPlayer.play();
};

mediaPlayer.prototype.load = function() {
	myPlayer.load();
};

mediaPlayer.prototype.pause = function() {
	myPlayer.pause();
};

mediaPlayer.prototype.currentTime = function() {
	return myPlayer.currentTime();
};

mediaPlayer.prototype.seek = function(beginpo,endpos) {
	myPlayer.seek();
};