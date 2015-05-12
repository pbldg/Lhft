;(function($){
/**
 * jqGrid Greek (el) Translation
 * Alex Cicovic
 * http://www.alexcicovic.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "View {0} - {1} of {2}",
	    emptyrecords: "No records to view",
		loadtext: "桅蠈蚁蟿蝇蟽畏...",
		pgtext : "Page {0} of {1}"
	},
	search : {
	    caption: "螒谓伪味萎蟿畏蟽畏...",
	    Find: "螘蠉蚁蔚蟽畏",
	    Reset: "螘蟺伪谓伪蠁慰蚁维",
	    odata : ['equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],
	    groupOps: [	{ op: "AND", text: "all" },	{ op: "OR",  text: "any" }	],
		matchText: " match",
		rulesText: " rules"
	},
	edit : {
	    addCaption: "螘喂蟽伪纬蝇纬萎 螘纬纬蚁伪蠁萎蟼",
	    editCaption: "螘蟺蔚尉蔚蚁纬伪蟽委伪 螘纬纬蚁伪蠁萎蟼",
	    bSubmit: "螝伪蟿伪蠂蠋蚁畏蟽畏",
	    bCancel: "螁魏蠀蚁慰",
		bClose: "螝位蔚委蟽喂渭慰",
		saveData: "Data has been changed! Save changes?",
		bYes : "Yes",
		bNo : "No",
		bExit : "Cancel",
	    msg: {
	        required:"韦慰 蟺蔚未委慰 蔚委谓伪喂 伪蟺伪蚁伪委蟿畏蟿慰",
	        number:"韦慰 蟺蔚未委慰 未苇蠂蔚蟿伪喂 渭蠈谓慰 伪蚁喂胃渭慰蠉蟼",
	        minValue:"螚 蟿喂渭萎 蟺蚁苇蟺蔚喂 谓伪 蔚委谓伪喂 渭蔚纬伪位蠉蟿蔚蚁畏 萎 委蟽畏 蟿慰蠀 ",
	        maxValue:"螚 蟿喂渭萎 蟺蚁苇蟺蔚喂 谓伪 蔚委谓伪喂 渭喂魏蚁蠈蟿蔚蚁畏 萎 委蟽畏 蟿慰蠀 ",
	        email: "螚 未喂蔚蠉胃蠀谓蟽畏 e-mail 未蔚谓 蔚委谓伪喂 苇纬魏蠀蚁畏",
	        integer: "韦慰 蟺蔚未委慰 未苇蠂蔚蟿伪喂 渭蠈谓慰 伪魏苇蚁伪喂慰蠀蟼 伪蚁喂胃渭慰蠉蟼",
			url: "is not a valid URL. Prefix required ('http://' or 'https://')",
			nodefined : " is not defined!",
			novalue : " return value is required!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
		}
	},
	view : {
	    caption: "View Record",
	    bClose: "Close"
	},
	del : {
	    caption: "螖喂伪纬蚁伪蠁萎",
	    msg: "螖喂伪纬蚁伪蠁萎 蟿蝇谓 蔚蟺喂位蔚纬渭苇谓蝇谓 蔚纬纬蚁伪蠁蠋谓;",
	    bSubmit: "螡伪喂",
	    bCancel: "螁魏蠀蚁慰"
	},
	nav : {
		edittext: " ",
	    edittitle: "螘蟺蔚尉蔚蚁纬伪蟽委伪 蔚蟺喂位蔚纬渭苇谓畏蟼 蔚纬纬蚁伪蠁萎蟼",
		addtext:" ",
	    addtitle: "螘喂蟽伪纬蝇纬萎 谓苇伪蟼 蔚纬纬蚁伪蠁萎蟼",
	    deltext: " ",
	    deltitle: "螖喂伪纬蚁伪蠁萎 蔚蟺喂位蔚纬渭苇谓畏蟼 蔚纬纬蚁伪蠁萎蟼",
	    searchtext: " ",
	    searchtitle: "螘蠉蚁蔚蟽畏 螘纬纬蚁伪蠁蠋谓",
	    refreshtext: "",
	    refreshtitle: "螒谓伪谓苇蝇蟽畏 螤委谓伪魏伪",
	    alertcap: "螤蚁慰蟽慰蠂萎",
	    alerttext: "螖蔚谓 苇蠂蔚蟿蔚 蔚蟺喂位苇尉蔚喂 蔚纬纬蚁伪蠁萎",
		viewtext: "",
		viewtitle: "View selected row"
	},
	col : {
	    caption: "螘渭蠁维谓喂蟽畏 / 螒蟺蠈魏蚁蠀蠄畏 危蟿畏位蠋谓",
	    bSubmit: "螣螝",
	    bCancel: "螁魏蠀蚁慰"
	},
	errors : {
		errcap : "危蠁维位渭伪",
		nourl : "螖蔚谓 苇蠂蔚喂 未慰胃蔚委 未喂蔚蠉胃蠀谓蟽畏 蠂蔚喂蚁喂蟽渭慰蠉 纬喂伪 蟿畏 蟽蠀纬魏蔚魏蚁喂渭苇谓畏 蔚谓苇蚁纬蔚喂伪",
		norecords: "螖蔚谓 蠀蟺维蚁蠂慰蠀谓 蔚纬纬蚁伪蠁苇蟼 蟺蚁慰蟼 蔚蟺蔚尉蔚蚁纬伪蟽委伪",
		model : "螁谓喂蟽慰蟼 伪蚁喂胃渭蠈蟼 蟺蔚未委蝇谓 colNames/colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"螝蠀蚁", "螖蔚蠀", "韦蚁喂", "韦蔚蟿", "螤蔚渭", "螤伪蚁", "危伪尾",
				"螝蠀蚁喂伪魏萎", "螖蔚蠀蟿苇蚁伪", "韦蚁委蟿畏", "韦蔚蟿维蚁蟿畏", "螤苇渭蟺蟿畏", "螤伪蚁伪蟽魏蔚蠀萎", "危维尾尾伪蟿慰"
			],
			monthNames: [
				"螜伪谓", "桅蔚尾", "螠伪蚁", "螒蟺蚁", "螠伪喂", "螜慰蠀谓", "螜慰蠀位", "螒蠀纬", "危蔚蟺", "螣魏蟿", "螡慰蔚", "螖蔚魏",
				"螜伪谓慰蠀维蚁喂慰蟼", "桅蔚尾蚁慰蠀维蚁喂慰蟼", "螠维蚁蟿喂慰蟼", "螒蟺蚁委位喂慰蟼", "螠维喂慰蟼", "螜慰蠉谓喂慰蟼", "螜慰蠉位喂慰蟼", "螒蠉纬慰蠀蟽蟿慰蟼", "危蔚蟺蟿苇渭尾蚁喂慰蟼", "螣魏蟿蠋尾蚁喂慰蟼", "螡慰苇渭尾蚁喂慰蟼", "螖蔚魏苇渭尾蚁喂慰蟼"
			],
			AmPm : ["蟺渭","渭渭","螤螠","螠螠"],
			S: function (j) {return j == 1 || j > 1 ? ['畏'][Math.min((j - 1) % 10, 3)] : ''},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			masks : {
	            ISO8601Long:"Y-m-d H:i:s",
	            ISO8601Short:"Y-m-d",
	            ShortDate: "n/j/Y",
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
