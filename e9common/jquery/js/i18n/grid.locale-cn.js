;(function($){
/**
 * jqGrid Chinese Translation for v4.2
 * henryyan 2011.11.30
 * http://www.wsria.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * update 2011.11.30
 *		add double u3000 SPACE for search:odata to fix SEARCH box display err when narrow width from only use of eq/ne/cn/in/lt/gt operator under IE6/7
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "{0} - {1}\u3000鍏?{2} 鏉?,	// 鍏卞瓧鍓嶆槸鍏ㄨ绌烘牸
		emptyrecords: "镞犳暟鎹樉绀?,
		loadtext: "璇诲彇涓?..",
		pgtext : " {0} 鍏?{1} 椤?
	},
	search : {
		caption: "鎼灭储...",
		Find: "镆ユ垒",
		Reset: "閲岖疆",
		odata : ['绛変簬\u3000\u3000', '涓岖瓑\u3000\u3000', '灏忎簬\u3000\u3000', '灏忎簬绛変簬','澶т簬\u3000\u3000','澶т簬绛変簬', 
			'寮€濮嬩簬','涓嶅紑濮嬩簬','灞炰簬\u3000\u3000','涓嶅睘浜?,'缁撴潫浜?,'涓岖粨鏉熶簬','鍖呭惈\u3000\u3000','涓嶅寘鍚?,'绌哄€间簬\u3000\u3000','闱炵┖链?],
		groupOps: [	{ op: "AND", text: "镓€链? },	{ op: "OR",  text: "浠讳竴" }	],
		matchText: " 鍖归厤",
		rulesText: " 瑙勫垯"
	},
	edit : {
		addCaption: "娣诲姞璁板綍",
		editCaption: "缂栬緫璁板綍",
		bSubmit: "鎻愪氦",
		bCancel: "鍙栨秷",
		bClose: "鍏抽棴",
		saveData: "鏁版嵁宸叉敼鍙桡紝鏄惁淇濆瓨锛?,
		bYes : "鏄?,
		bNo : "鍚?,
		bExit : "鍙栨秷",
		msg: {
			required:"姝ゅ瓧娈靛繀闇€",
			number:"璇疯緭鍏ユ湁鏁堟暟瀛?,
			minValue:"杈揿€煎繀椤诲ぇ浜庣瓑浜?",
			maxValue:"杈揿€煎繀椤诲皬浜庣瓑浜?",
			email: "杩欎笉鏄湁鏁堢殑e-mail鍦板潃",
			integer: "璇疯緭鍏ユ湁鏁堟暣鏁?,
			date: "璇疯緭鍏ユ湁鏁堟椂闂?,
			url: "镞犳晥缃戝潃銆傚墠缂€蹇呴』涓?('http://' 鎴?'https://')",
			nodefined : " 链畾涔夛紒",
			novalue : " 闇€瑕佽繑锲炲€硷紒",
			customarray : "镊畾涔夊嚱鏁伴渶瑕佽繑锲炴暟缁勶紒",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "镆ョ湅璁板綍",
		bClose: "鍏抽棴"
	},
	del : {
		caption: "鍒犻櫎",
		msg: "鍒犻櫎镓€阃夎褰曪紵",
		bSubmit: "鍒犻櫎",
		bCancel: "鍙栨秷"
	},
	nav : {
		edittext: "",
		edittitle: "缂栬緫镓€阃夎褰?,
		addtext:"",
		addtitle: "娣诲姞鏂拌褰?,
		deltext: "",
		deltitle: "鍒犻櫎镓€阃夎褰?,
		searchtext: "",
		searchtitle: "镆ユ垒",
		refreshtext: "",
		refreshtitle: "鍒锋柊琛ㄦ牸",
		alertcap: "娉ㄦ剰",
		alerttext: "璇烽€夋嫨璁板綍",
		viewtext: "",
		viewtitle: "镆ョ湅镓€阃夎褰?
	},
	col : {
		caption: "阃夋嫨鍒?,
		bSubmit: "纭畾",
		bCancel: "鍙栨秷"
	},
	errors : {
		errcap : "阌栾",
		nourl : "娌℃湁璁剧疆url",
		norecords: "娌℃湁瑕佸鐞嗙殑璁板綍",
		model : "colNames 鍜?colModel 闀垮害涓岖瓑锛?
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
		         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'm-d-Y',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "Y/j/n",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "F, Y"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);
