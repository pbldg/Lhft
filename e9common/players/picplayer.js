var $pPlayer;
var picPlayer = function (settings) {
	this.id = settings.id;
	this.type = settings.type;
	this.objwidth = settings.objwidth;
	this.objheight = settings.objheight;
	this.width = settings.width;
	this.height = settings.height;
	this.fileurl = settings.fileurl;
	this.imageurl = settings.imageurl;
	this.title = settings.title;
	this.desc = settings.desc;
};
picPlayer.prototype.toString = function() {
    /*<div class="mygallery">
		<div class="tn3 album">
		    <ol>
				<li>
				    <h4>Hohensalzburg Castle</h4>
				    <a href="images/620x378/1.jpg">
					<img src="images/35x35/1.jpg" />
				    </a>
				</li>
		    </ol>
		</div>
	</div>*/
	var files = this.fileurl.split(",");
	var images = this.imageurl.split(",");
	var descs = this.desc.split(",");
	var picstr = '<div class="mygallery">\r\n';
	picstr += '\t<div class="tn3 album">\r\n';
	picstr += '\t\t<ol>\r\n';
	$.each(files,function(i,item){
		picstr += '\t\t\t<li>\r\n';
		picstr += '\t\t\t\t<h4>'+descs[i]+'</h4>\r\n';
		picstr += '\t\t\t\t<a href="'+files[i]+'">\r\n';
		//显示缩略图
		//picstr += '\t\t\t\t<img src="'+images[i]+'"/>\r\n';
		//显示数字
		picstr += '\t\t\t\t<img src="/e9common/images/empty.gif"/>\r\n';
		picstr += '\t\t\t\t</a>\r\n';
		picstr += '\t\t\t</li>\r\n';
	});
	picstr += '\t\t</ol>\r\n';
	picstr += '\t</div>\r\n';
	picstr += '</div>\r\n';
	return picstr;
};
picPlayer.prototype.initPlayer = function(id){
	$("#"+id).append(this.toString());
	$pPlayer = $('.mygallery').tn3({
		width:this.width,
		height:this.height,
		autoplay:false,
	    delay:3000,
		skinDir:"/e9common/players/tn3/skins",
		imageClick:"fullscreen",
		image:{
			maxZoom:1.5,
			crop:true,
			clickEvent:"dblclick",
			transitions:[{
				type:"blinds"
				},{
				type:"grid"
				},{
				type:"grid",
				duration:460,
				easing:"easeInQuad",
				gridX:1,
				gridY:8,
				// flat, diagonal, circle, random
				sort:"random",
				sortReverse:false,
				diagonalStart:"bl",
				// fade, scale
				method:"scale",
				partDuration:360,
				partEasing:"easeOutSine",
				partDirection:"left"
			}]
		}
	}).data('tn3');
	//把图片替换成数字 
	img2div();
};
picPlayer.prototype.stop = function() {

};

picPlayer.prototype.load = function() {
};

picPlayer.prototype.play = function() {
	
};

picPlayer.prototype.pause = function() {
	
};

picPlayer.prototype.seek = function(beginpo,endpos) {

};
function test(){
	alert($pPlayer.config.width)
	$pPlayer.config.width=300;
	alert($pPlayer.config.height)
	$pPlayer.config.height=400;
	$pPlayer.resize(300,400);
}
function img2div(){
	var index = 1;
	var interval = setInterval(function(){
		if($("li img").size()>0){
			$.each($("li img"),function(i,item){
				$(item).parent().append(getdiv(index++));
				$(item).remove();
			});	
		}else{
			clearInterval(interval);
		}
		
	},500);
}
function getdiv(seq){
	var str = '<div style="color:white;font-size:12px;padding-top:10px;text-align:center;">'+seq+'</div>';
	return str;
}