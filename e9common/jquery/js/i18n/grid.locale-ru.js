;(function($){
/**
 * jqGrid Russian Translation v1.0 02.07.2009 (based on translation by Alexey Kanaev v1.1 21.01.2009, http://softcore.com.ru)
 * Sergey Dyagovchenko
 * http://d.sumy.ua
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "袩褉芯褋屑芯褌褉 {0} - {1} 懈蟹 {2}",
	  emptyrecords: "袧械褌 蟹邪锌懈褋械泄 写谢褟 锌褉芯褋屑芯褌褉邪",
		loadtext: "袟邪谐褉褍蟹泻邪...",
		pgtext : "小褌褉. {0} 懈蟹 {1}"
	},
	search : {
    caption: "袩芯懈褋泻...",
    Find: "袧邪泄褌懈",
    Reset: "小斜褉芯褋",
    odata : ['褉邪胁薪芯', '薪械 褉邪胁薪芯', '屑械薪褜褕械', '屑械薪褜褕械 懈谢懈 褉邪胁薪芯','斜芯谢褜褕械','斜芯谢褜褕械 懈谢懈 褉邪胁薪芯', '薪邪褔懈薪邪械褌褋褟 褋','薪械 薪邪褔懈薪邪械褌褋褟 褋','薪邪褏芯写懈褌褋褟 胁','薪械 薪邪褏芯写懈褌褋褟 胁','蟹邪泻邪薪褔懈胁邪械褌褋褟 薪邪','薪械 蟹邪泻邪薪褔懈胁邪械褌褋褟 薪邪','褋芯写械褉卸懈褌','薪械 褋芯写械褉卸懈褌'],
    groupOps: [	{ op: "AND", text: "胁褋械" },	{ op: "OR",  text: "谢褞斜芯泄" }	],
    matchText: " 褋芯胁锌邪写邪械褌",
    rulesText: " 锌褉邪胁懈谢邪"
	},
	edit : {
    addCaption: "袛芯斜邪胁懈褌褜 蟹邪锌懈褋褜",
    editCaption: "袪械写邪泻褌懈褉芯胁邪褌褜 蟹邪锌懈褋褜",
    bSubmit: "小芯褏褉邪薪懈褌褜",
    bCancel: "袨褌屑械薪邪",
		bClose: "袟邪泻褉褘褌褜",
		saveData: "袛邪薪薪褘械 斜褘谢懈 懈蟹屑械薪械薪薪褘! 小芯褏褉邪薪懈褌褜 懈蟹屑械薪械薪懈褟?",
		bYes : "袛邪",
		bNo : "袧械褌",
		bExit : "袨褌屑械薪邪",
	    msg: {
        required:"袩芯谢械 褟胁谢褟械褌褋褟 芯斜褟蟹邪褌械谢褜薪褘屑",
        number:"袩芯卸邪谢褍泄褋褌邪, 胁胁械写懈褌械 锌褉邪胁懈谢褜薪芯械 褔懈褋谢芯",
        minValue:"蟹薪邪褔械薪懈械 写芯谢卸薪芯 斜褘褌褜 斜芯谢褜褕械 谢懈斜芯 褉邪胁薪芯",
        maxValue:"蟹薪邪褔械薪懈械 写芯谢卸薪芯 斜褘褌褜 屑械薪褜褕械 谢懈斜芯 褉邪胁薪芯",
        email: "薪械泻芯褉褉械泻褌薪芯械 蟹薪邪褔械薪懈械 e-mail",
        integer: "袩芯卸邪谢褍泄褋褌邪, 胁胁械写懈褌械 褑械谢芯械 褔懈褋谢芯",
        date: "袩芯卸邪谢褍泄褋褌邪, 胁胁械写懈褌械 锌褉邪胁懈谢褜薪褍褞 写邪褌褍",
        url: "薪械胁械褉薪邪褟 褋褋褘谢泻邪. 袧械芯斜褏芯写懈屑芯 胁胁械褋褌懈 锌褉械褎懈泻褋 ('http://' or 'https://')",
		nodefined : " is not defined!",
		novalue : " return value is required!",
		customarray : "Custom function should return array!",
		customfcheck : "Custom function should be present in case of custom checking!"
		}
	},
	view : {
	    caption: "袩褉芯褋屑芯褌褉 蟹邪锌懈褋懈",
	    bClose: "袟邪泻褉褘褌褜"
	},
	del : {
	    caption: "校写邪谢懈褌褜",
	    msg: "校写邪谢懈褌褜 胁褘斜褉邪薪薪褍褞 蟹邪锌懈褋褜(懈)?",
	    bSubmit: "校写邪谢懈褌褜",
	    bCancel: "袨褌屑械薪邪"
	},
	nav : {
  		edittext: " ",
	    edittitle: "袪械写邪泻褌懈褉芯胁邪褌褜 胁褘斜褉邪薪薪褍褞 蟹邪锌懈褋褜",
  		addtext:" ",
	    addtitle: "袛芯斜邪胁懈褌褜 薪芯胁褍褞 蟹邪锌懈褋褜",
	    deltext: " ",
	    deltitle: "校写邪谢懈褌褜 胁褘斜褉邪薪薪褍褞 蟹邪锌懈褋褜",
	    searchtext: " ",
	    searchtitle: "袧邪泄褌懈 蟹邪锌懈褋懈",
	    refreshtext: "",
	    refreshtitle: "袨斜薪芯胁懈褌褜 褌邪斜谢懈褑褍",
	    alertcap: "袙薪懈屑邪薪懈械",
	    alerttext: "袩芯卸邪谢褍泄褋褌邪, 胁褘斜械褉懈褌械 蟹邪锌懈褋褜",
  		viewtext: "",
  		viewtitle: "袩褉芯褋屑芯褌褉械褌褜 胁褘斜褉邪薪薪褍褞 蟹邪锌懈褋褜"
	},
	col : {
	    caption: "袩芯泻邪蟹邪褌褜/褋泻褉褘褌褜 褋褌芯谢斜褑褘",
	    bSubmit: "小芯褏褉邪薪懈褌褜",
	    bCancel: "袨褌屑械薪邪"	
	},
	errors : {
		errcap : "袨褕懈斜泻邪",
		nourl : "URL 薪械 褍褋褌邪薪芯胁谢械薪",
		norecords: "袧械褌 蟹邪锌懈褋械泄 写谢褟 芯斜褉邪斜芯褌泻懈",
    model : "效懈褋谢芯 锌芯谢械泄 薪械 褋芯芯褌胁械褌褋褌胁褍械褌 褔懈褋谢褍 褋褌芯谢斜褑芯胁 褌邪斜谢懈褑褘!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"袙褋", "袩薪", "袙褌", "小褉", "效褌", "袩褌", "小斜",
				"袙芯褋泻褉械褋械薪懈械", "袩芯薪械写械谢褜薪懈泻", "袙褌芯褉薪懈泻", "小褉械写邪", "效械褌胁械褉谐", "袩褟褌薪懈褑邪", "小褍斜斜芯褌邪"
			],
			monthNames: [
				"携薪胁", "肖械胁", "袦邪褉", "袗锌褉", "袦邪泄", "袠褞薪", "袠褞谢", "袗胁谐", "小械薪", "袨泻褌", "袧芯褟", "袛械泻",
				"携薪胁邪褉褜", "肖械胁褉邪谢褜", "袦邪褉褌", "袗锌褉械谢褜", "袦邪泄", "袠褞薪褜", "袠褞谢褜", "袗胁谐褍褋褌", "小械薪褌褟斜褉褜", "袨泻褌褟斜褉褜", "袧芯褟斜褉褜", "袛械泻邪斜褉褜"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'd.m.Y',
			masks : {
	            ISO8601Long:"Y-m-d H:i:s",
	            ISO8601Short:"Y-m-d",
	            ShortDate: "n.j.Y",
	            LongDate: "l, F d, Y",
	            FullDateTime: "l, F d, Y G:i:s",
	            MonthDay: "F d",
	            ShortTime: "G:i",
	            LongTime: "G:i:s",
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
