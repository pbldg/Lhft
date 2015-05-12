var cplayer;
var player = function (settings) {
	cplayer = null;
	if(settings.type=="media"){
		cplayer = new mediaPlayer(settings);
	}else if(settings.type=="pic"){
		cplayer = new picPlayer(settings);
	}else if(settings.type=="swf"){
		cplayer = new swfPlayer(settings);
	}else if(settings.type=="flv"){
		cplayer = new jwPlayer(settings);
	}else if(settings.type=="wmv"){
		cplayer = new wmvPlayer(settings);
	}else if(settings.type="ppt"){
		cplayer = new pptPlayer(settings);
	}
};
player.prototype.toString = function() {
	return cplayer.toString();
};
//初始化
player.prototype.initPlayer = function(id){
	cplayer.initPlayer(id);
};
//停止
player.prototype.stop = function() {
	cplayer.stop();
};
//播放
player.prototype.play = function() {
	cplayer.play();
};
//加载
player.prototype.load = function() {
	cplayer.load();
};
//暂停
player.prototype.pause = function() {
	cplayer.pause();
};

//当前播放时间
player.prototype.currentTime = function() {
	return cplayer.currentTime();
};

player.prototype.getstate = function() {
	return cplayer.getstate();
};

player.prototype.duration = function() {
	return cplayer.duration();
};

player.prototype.seek = function(beginpo,endpos) {
	cplayer.seek(beginpo, endpos);
};
