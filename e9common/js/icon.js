var isIE;
var ua = navigator.userAgent.toLowerCase();
isIE = ((ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1) && (ua.indexOf("webtv") == -1)); 

function el(object){
	return document.getElementById(object);
}

var iconhtml="";
var showicontext="";
var icon=["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","咖啡","猪头","玫瑰","吻","人民币","ok","no","勾引","抱拳","飞吻","爱心","哦耶","握手","弱","强","拥抱","礼物","太阳","月亮"];
var iconimg=[];
var showimgid;
var initicon=false;

for (var i=0,l=icon.length; i<l; i++)
{
	iconimg.push("<img alt='"+(100+i)+"' title='"+icon[i]+"'src='images/icon/face/"+(100+i)+".gif'/>");
}
function hovericon(){
	this.className='hoverf';
}
function outicon(){
	this.className='outf';
}
function chooseicon(){
	el(showicontext).value=this.title;
	if(showimgid!=null){
		el(showimgid).src="images/icon/face/"+(100+parseInt(this.title))+".gif";
	}
	closeicons();
}

function showicons(evt,showid,showimg){
	if(!initicon){
		for (var i=0,l=icon.length; i<l; i++)
		{
			iconhtml+="<img src='images/icon/face/"+(100+i)+".gif' alt='"+icon[i]+"' title='"+i+"'>";
		}
		el('iconarea').innerHTML=iconhtml;
		for (var i=0,l=el('iconarea').childNodes.length; i<l; i++)
		{
			el('iconarea').childNodes[i].onmouseover = hovericon;
			el('iconarea').childNodes[i].onmouseout = outicon;
			el('iconarea').childNodes[i].onclick = chooseicon;
		}
		initicon=true;
	}
	/*
	var event=evt?evt:window.event;
	var x=event.x?event.x:event.pageX;
	if (isIE){
		if(navigator.userAgent.indexOf("MSIE8.0")>0){var y=event.y?(document.body.scrollTop+event.y):event.pageY;}
		else{var y=event.y?(document.documentElement.scrollTop+event.y):event.pageY;}
	}
	else{
		var isOpera;
		var ua = navigator.userAgent.toLowerCase();
		isOpera = ((ua.indexOf("msie") == -1) && (ua.indexOf("opera") != -1) && (ua.indexOf("webtv") == -1));
		if (isOpera){var y=event.y?(document.documentElement.scrollTop+event.y):event.pageY;}
		else{var y=event.y?(document.body.scrollTop+event.y):event.pageY;}
	}
	//var y=document.documentElement.scrollTop+event.y;
	el('iconarea').style.left=x-255+'px';
	el('iconarea').style.top=y-22+'px';
	*/
	el('iconarea').style.display=(el('iconarea').style.display=='block')?'none':'block';
	
	showicontext=showid;
	showimgid = showimg;
}
function closeicons(){
	el('iconarea').style.display='none';
}
function replaceicon(ct){
	var re = /\[(.+?)\]/g;
	var arr = ct.replace(re,function(s){s=s.replace(/(\[|\])/g,'');return (getindex(icon,s)!=-1)?iconimg[getindex(icon,s)]:("["+s+"]")});
	return arr;
}
function replaceiconback(ct){
	var re=/<img[^>]+alt=([\"\']?)(\d+)(\1)[^>]*>/gi;
	var arr = ct.replace(re,function($1, $2, $3) {return "["+icon[$3-100]+"]";});
	return arr;
}
