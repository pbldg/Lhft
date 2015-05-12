;(function($){
/**
 * jqGrid Thai Translation
 * Kittituch Manakul m.kittituch@Gmail.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "喙佮釜喔断竾 {0} - {1} 喔堗覆喔?{2}",
		emptyrecords: "喙剿浮喙堗笧喔氞竞喙夃腑喔∴腹喔?,
		loadtext: "喔佮赋喔ム副喔囙福喙夃腑喔囙竞喔竞喙夃腑喔∴腹喔?..",
		pgtext : "喔笝喙夃覆 {0} 喔堗覆喔?{1}"
	},
	search : {
		caption: "喔佮赋喔ム副喔囙竸喙夃笝喔覆...",
		Find: "喔剿箟喔权斧喔?,
		Reset: "喔剿阜喔权竸喙堗覆喔佮弗喔编笟",
		odata : ['喙€喔椸箞喔侧竵喔编笟', '喙剿浮喙堗箑喔椸箞喔侧竵喔编笟', '喔权箟喔涪喔佮抚喙堗覆', '喙剿浮喙堗浮喔侧竵喔佮抚喙堗覆','喔∴覆喔佮竵喔佮抚喙堗覆','喙剿浮喙堗笝喙夃腑喔⑧竵喔о箞喔?, '喔傕付喙夃笝喔曕箟喔权笖喙夃抚喔?,'喙剿浮喙堗竞喔多箟喔权笗喙夃笝喔断箟喔о涪','喔∴傅喔剿赋喙冟笖喔剿赋喔笝喔多箞喔囙箖喔?,'喙剿浮喙堗浮喔掂竸喔赤箖喔断竸喔赤斧喔权付喙堗竾喙冟笝','喔ム竾喔椸箟喔侧涪喔断箟喔о涪','喙剿浮喙堗弗喔囙笚喙夃覆喔⑧笖喙夃抚喔?,'喔∴傅喔剿赋喔о箞喔?,'喙剿浮喙堗浮喔掂竸喔赤抚喙堗覆'],
		groupOps: [	{ op: "喙佮弗喔?, text: "喔椸副喙夃竾喔浮喔? },	{ op: "喔福喔粪腑",  text: "喙冟笖喙? }	],
		matchText: " 喔曕福喔囙竵喔编笝喔佮副喔?,
		rulesText: " 喔曕覆喔∴竵喔?
	},
	edit : {
		addCaption: "喙€喔炧复喙堗浮喔傕箟喔浮喔灌弗",
		editCaption: "喙佮竵喙夃箘喔傕竞喙夃腑喔∴腹喔?,
		bSubmit: "喔氞副喔权笚喔多竵",
		bCancel: "喔⑧竵喙€喔ム复喔?,
		bClose: "喔涏复喔?,
		saveData: "喔剿父喔撪笗喙夃腑喔囙竵喔侧福喔氞副喔权笚喔多竵喔侧福喙佮竵喙夃箘喔?喙冟笂喙堗斧喔｀阜喔箘喔∴箞?",
		bYes : "喔氞副喔权笚喔多竵",
		bNo : "喔ム赴喔椸复喙夃竾喔佮覆喔｀箒喔佮箟喙剿竞",
		bExit : "喔⑧竵喙€喔ム复喔?,
		msg: {
			required:"喔傕箟喔浮喔灌弗喔权傅喙夃笀喔赤箑喔涏箛喔?,
			number:"喔佮福喔膏笓喔侧竵喔｀腑喔佮斧喔∴覆喔⑧箑喔ム竞喙冟斧喙夃笘喔灌竵喔曕箟喔竾",
			minValue:"喔剿箞喔侧竞喔竾喔傕箟喔浮喔灌弗喔权傅喙夃笗喙夃腑喔囙箘喔∴箞喔权箟喔涪喔佮抚喙堗覆",
			maxValue:"喔剿箞喔侧竞喔竾喔傕箟喔浮喔灌弗喔权傅喙夃笗喙夃腑喔囙箘喔∴箞喔∴覆喔佮竵喔о箞喔?,
			email: "喔傅喙€喔∴弗喔ム箤喔权傅喙夃箘喔∴箞喔栢腹喔佮笗喙夃腑喔?,
			integer: "喔佮福喔膏笓喔侧竵喔｀腑喔佮箑喔涏箛喔权笀喔赤笝喔о笝喙€喔曕箛喔?,
			date: "喔佮福喔膏笓喔侧竵喔｀腑喔佮抚喔编笝喔椸傅喙堗箖喔箟喔栢腹喔佮笗喙夃腑喔?,
			url: "URL 喙剿浮喙堗笘喔灌竵喔曕箟喔竾 URL 喔堗赋喙€喔涏箛喔权笗喙夃腑喔囙竞喔多箟喔权笗喙夃笝喔断箟喔о涪 'http://' 喔福喔粪腑 'https://'",
			nodefined : "喙剿浮喙堗箘喔断箟喔栢腹喔佮竵喔赤斧喔权笖喔剿箞喔?",
			novalue : "喔曕箟喔竾喔佮覆喔｀竵喔侧福喔剿阜喔权竸喙堗覆!",
			customarray : "喔熰副喔囙竵喙屶笂喔编笝喔椸傅喙堗釜喔｀箟喔侧竾喔傕付喙夃笝喔曕箟喔竾喔箞喔囙竸喙堗覆喔佮弗喔编笟喙€喔涏箛喔权箒喔氞笟喙佮腑喙€喔｀涪喙?,
			customfcheck : "喔｀赴喔氞笟喔曕箟喔竾喔佮覆喔｀笩喔编竾喔佮箤喔娻副喔权笚喔掂箞喔福喙夃覆喔囙竞喔多箟喔权釜喔赤斧喔｀副喔氞竵喔侧福喔曕福喔о笀喔腑喔?"
			
		}
	},
	view : {
		caption: "喙€喔｀傅喔⑧竵喔断腹喔傕箟喔浮喔灌弗",
		bClose: "喔涏复喔?
	},
	del : {
		caption: "喔ム笟喔傕箟喔浮喔灌弗",
		msg: "喔剿父喔撪笗喙夃腑喔囙竵喔侧福喔ム笟喔傕箟喔浮喔灌弗喔椸傅喙堗笘喔灌竵喙€喔ム阜喔竵 喙冟笂喙堗斧喔｀阜喔箘喔∴箞?",
		bSubmit: "喔曕箟喔竾喔佮覆喔｀弗喔?,
		bCancel: "喔⑧竵喙€喔ム复喔?
	},
	nav : {
		edittext: "",
		edittitle: "喙佮竵喙夃箘喔傕竞喙夃腑喔∴腹喔?,
		addtext:"",
		addtitle: "喙€喔炧复喙堗浮喔傕箟喔浮喔灌弗",
		deltext: "",
		deltitle: "喔ム笟喔傕箟喔浮喔灌弗",
		searchtext: "",
		searchtitle: "喔剿箟喔权斧喔侧竞喙夃腑喔∴腹喔?,
		refreshtext: "",
		refreshtitle: "喔｀傅喙€喔熰福喔?,
		alertcap: "喔剿赋喙€喔曕阜喔笝",
		alerttext: "喔佮福喔膏笓喔侧箑喔ム阜喔竵喔傕箟喔浮喔灌弗",
		viewtext: "",
		viewtitle: "喔断腹喔｀覆喔⑧弗喔班箑喔傅喔⑧笖喔傕箟喔浮喔灌弗"
	},
	col : {
		caption: "喔佮福喔膏笓喔侧箑喔ム阜喔竵喔剿腑喔ム副喔∴笝喙?,
		bSubmit: "喔曕竵喔ム竾",
		bCancel: "喔⑧竵喙€喔ム复喔?
	},
	errors : {
		errcap : "喙€喔佮复喔断竸喔о覆喔∴笢喔脆笖喔炧弗喔侧笖",
		nourl : "喙剿浮喙堗箘喔断箟喔佮赋喔笝喔?URL",
		norecords: "喙剿浮喙堗浮喔掂竞喙夃腑喔∴腹喔ム箖喔箟喔断赋喙€喔权复喔权竵喔侧福",
		model : "喔堗赋喔权抚喔权竸喔弗喔编浮喔权箤喙剿浮喙堗箑喔椸箞喔侧竵喔编笟喔堗赋喔权抚喔权竸喔弗喔编浮喔权箤喙傕浮喙€喔断弗!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"喔覆", "喔?, "喔?, "喔?, "喔炧袱", "喔?, "喔?,
				"喔覆喔椸复喔曕涪喙?, "喔堗副喔权笚喔｀箤", "喔副喔囙竸喔侧福", "喔炧父喔?, "喔炧袱喔副喔笟喔断傅", "喔ㄠ腹喔佮福喙?, "喙€喔覆喔｀箤"
			],
			monthNames: [
				"喔?喔?", "喔?喔?", "喔∴傅.喔?", "喙€喔?喔?", "喔?喔?", "喔∴复.喔?", "喔?喔?", "喔?喔?", "喔?喔?", "喔?喔?", "喔?喔?", "喔?喔?",
				"喔∴竵喔｀覆喔剿浮", "喔佮父喔∴笭喔侧笧喔编笝喔樴箤", "喔∴傅喔权覆喔剿浮", "喙€喔∴俯喔侧涪喔?, "喔炧袱喔┼笭喔侧竸喔?, "喔∴复喔栢父喔权覆喔⑧笝", "喔佮福喔佮笍喔侧竸喔?, "喔复喔囙斧喔侧竸喔?, "喔佮副喔权涪喔侧涪喔?, "喔曕父喔ム覆喔剿浮", "喔炧袱喔ㄠ笀喔脆竵喔侧涪喔?, "喔樴副喔权抚喔侧竸喔?
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return ''},
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
