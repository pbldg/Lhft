

/**
 * 字符串转成日期, 格式yyyy-MM-dd或yyyy-MM-dd HH:mm:ss
 * @param dateString
 * @returns {Date}
 */
function parseString2Date(dateTimeString){
	if(!dateTimeString) return;
	var datePart = dateTimeString.split(" ");
	var dateAs = datePart[0].split("-");
	if (datePart.length > 1 && datePart[1].length > 0) {
		var timeAs = datePart[1].split(":");
		return new Date(dateAs[0], dateAs[1] - 1, dateAs[2], timeAs[0], timeAs[1], timeAs[2]);
	} else {
		return new Date(dateAs[0], dateAs[1] - 1, dateAs[2]);
	}
}

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式yyyy-MM-dd/yyyy-MM-dd hh:mm:ss
 * @returns
 */
function formatDateTime(date, format){
	if(!date) return;
	var o = {
		"M+" : date.getMonth() + 1, // month
		"d+" : date.getDate(), // day
		"h+" : date.getHours(), // hour
		"m+" : date.getMinutes(), // minute
		"s+" : date.getSeconds(), // second
		"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
		"S" : date.getMilliseconds()
		// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

/**
 * 将日期字符串格式化为yyyyMMdd
 * @param String 字符串日期
 * @returns yyyyMMdd
 */
function formatSDateTo8Date(stringDate){
	if(stringDate == null || stringDate.length < 10){
		return "";
	}
	stringDate = stringDate.replace(/-/g, '');
	return stringDate.substring(0, 8);
}

/**
 * 将8位日期字符串格式化为yyyy-MM-dd
 * @param String 字符串日期
 * @returns yyyy-MM-dd
 */
function format8DateToSDate(stringDate){
	if(stringDate == null || stringDate.length != 8){
		return "";
	}
	var year = stringDate.substring(0, 4);
	var month = stringDate.substring(4, 6);
	var day = stringDate.substring(6, 8);
	return year + "-" + month + "-" + day;
}