;(function($){
/**
 * jqGrid Hebrew Translation
 * Shuki Shukrun shukrun.shuki@gmail.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "诪爪讬讙 {0} - {1} 诪转谠讱 {2}",
		emptyrecords: "讗讬谉 专砖谠诪谠转 诇讛爪讬讙",
		loadtext: "讟谠注谉...",
		pgtext : "赞祝 {0} 诪转谠讱 {1}"
	},
	search : {
		caption: "诪谳驻砖...",
		Find: "谳驻砖",
		Reset: "讛转谳诇",
		odata : ['砖谠谠讛', '诇讗 砖谠谠讛', '拽讟谉', '拽讟谉 讗谠 砖谠谠讛','讙赞谠诇','讙赞谠诇 讗谠 砖谠谠讛', '诪转谳讬诇 讘','诇讗 诪转谳讬诇 讘','谞诪爪讗 讘','诇讗 谞诪爪讗 讘','诪住转讬讬诐 讘','诇讗 诪住转讬讬诐 讘','诪讻讬诇','诇讗 诪讻讬诇'],
		groupOps: [	{ op: "AND", text: "讛讻诇" },	{ op: "OR",  text: "讗谳赞 诪" }	],
		matchText: " 转谠讗诐",
		rulesText: " 谳谠拽讬诐"
	},
	edit : {
		addCaption: "讛谠住祝 专砖谠诪讛",
		editCaption: "注专谠讱 专砖谠诪讛",
		bSubmit: "砖诇谳",
		bCancel: "讘讟诇",
		bClose: "住讙谠专",
		saveData: "谞转谠谞讬诐 讛砖转谞谠! 诇砖诪谠专?",
		bYes : "讻谉",
		bNo : "诇讗",
		bExit : "讘讟诇",
		msg: {
			required:"砖赞讛 谳谠讘讛",
			number:"讗谞讗, 讛讻谞住 诪住驻专 转拽讬谉",
			minValue:"注专讱 爪专讬讱 诇讛讬谠转 讙赞谠诇 讗谠 砖谠谠讛 诇 ",
			maxValue:"注专讱 爪专讬讱 诇讛讬谠转 拽讟谉 讗谠 砖谠谠讛 诇 ",
			email: "讛讬讗 诇讗 讻转谠讘转 讗讬讬诪诇 转拽讬谞讛",
			integer: "讗谞讗, 讛讻谞住 诪住驻专 砖诇诐",
			date: "讗谞讗, 讛讻谞住 转讗专讬讱 转拽讬谉",
			url: "讛讻转谠讘转 讗讬谞讛 转拽讬谞讛. 赞专谠砖讛 转谳讬诇讬转 ('http://' 讗谠 'https://')",
			nodefined : " is not defined!",
			novalue : " return value is required!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
		}
	},
	view : {
		caption: "讛爪讙 专砖谠诪讛",
		bClose: "住讙谠专"
	},
	del : {
		caption: "诪谳拽",
		msg: "讛讗诐 诇诪谳谠拽 讗转 讛专砖谠诪讛/谠转 讛诪住谠诪谞谠转?",
		bSubmit: "诪谳拽",
		bCancel: "讘讟诇"
	},
	nav : {
		edittext: "",
		edittitle: "注专谠讱 砖谠专讛 诪住谠诪谞转",
		addtext:"",
		addtitle: "讛谠住祝 砖谠专讛 谳赞砖讛",
		deltext: "",
		deltitle: "诪谳拽 砖谠专讛 诪住谠诪谞转",
		searchtext: "",
		searchtitle: "谳驻砖 专砖谠诪谠转",
		refreshtext: "",
		refreshtitle: "讟注谉 讙专讬赞 诪谳赞砖",
		alertcap: "讗讝讛专讛",
		alerttext: "讗谞讗, 讘谳专 砖谠专讛",
		viewtext: "",
		viewtitle: "讛爪讙 砖谠专讛 诪住谠诪谞转"
	},
	col : {
		caption: "讛爪讙/讛住转专 注诪谠赞谠转",
		bSubmit: "砖诇谳",
		bCancel: "讘讟诇"
	},
	errors : {
		errcap : "砖讙讬讗讛",
		nourl : "诇讗 讛谠讙赞专讛 讻转谠讘转 url",
		norecords: "讗讬谉 专砖谠诪谠转 诇注讘赞",
		model : "讗谠专讱 砖诇 colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"讗", "讘", "讙", "赞", "讛", "谠", "砖",
				"专讗砖谠谉", "砖谞讬", "砖诇讬砖讬", "专讘讬注讬", "谳诪讬砖讬", "砖讬砖讬", "砖讘转"
			],
			monthNames: [
				"讬谞谠", "驻讘专", "诪专抓", "讗驻专", "诪讗讬", "讬谠谞", "讬谠诇", "讗谠讙", "住驻讟", "讗谠拽", "谞谠讘", "赞爪诪",
				"讬谞谠讗专", "驻讘专谠讗专", "诪专抓", "讗驻专讬诇", "诪讗讬", "讬谠谞讬", "讬谠诇讬", "讗谠讙谠住讟", "住驻讟诪讘专", "讗谠拽讟谠讘专", "谞谠讘诪讘专", "赞爪诪讘专"
			],
			AmPm : ["诇驻谞讬 讛爪讛专讬诐","讗谳专 讛爪讛专讬诐","诇驻谞讬 讛爪讛专讬诐","讗谳专 讛爪讛专讬诐"],
			S: function (j) {return j < 11 || j > 13 ? ['', '', '', ''][Math.min((j - 1) % 10, 3)] : ''},
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
