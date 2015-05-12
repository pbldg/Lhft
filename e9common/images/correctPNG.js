// 解决IE 5.5 & 6 PNG透明问题. 
function correctPNG() 
{ 
    var arVersion = navigator.appVersion.split("MSIE") 
    var version = parseFloat(arVersion[1]) 
    if ((version >= 5.5) && (version < 7.0) && (document.body.filters)) 
    { 
       for(var j=0; j<document.images.length; j++) 
       { 
          var img = document.images[j] 
          var imgName = img.src.toUpperCase() 
          if (imgName.substring(imgName.length-3, imgName.length) == "PNG") 
          { 
             var cssText = img.style.cssText;
             cssText += "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod:noscale,src='" + img.src + "');"; 
             img.style.cssText = cssText;
             img.src = "clear.gif";
          } 
       } 
    }     
} 
$(document).ready(function () {correctPNG();});