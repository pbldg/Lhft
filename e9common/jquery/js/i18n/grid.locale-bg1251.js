;(function($){
/**
 * jqGrid Bulgarian Translation 
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "{0} - {1} 锟斤拷 {2}",
		emptyrecords: "锟斤拷锟斤拷 锟斤拷锟斤拷锟?锟?",
		loadtext: "锟斤拷锟斤拷锟斤拷锟斤拷...",
		pgtext : "锟斤拷锟? {0} 锟斤拷 {1}"
	},
	search : {
		caption: "锟斤拷锟斤拷锟斤拷锟?..",
		Find: "锟斤拷锟斤拷锟斤拷",
		Reset: "锟斤拷锟斤拷锟斤拷锟?,
		odata : ['锟斤拷锟斤拷锟?, '锟斤拷锟斤拷锟斤拷锟斤拷', '锟斤拷-锟斤拷锟斤拷锟?, '锟斤拷-锟斤拷锟斤拷锟?锟斤拷锟?','锟斤拷-锟斤拷锟斤拷锟斤拷','锟斤拷-锟斤拷锟斤拷锟斤拷 锟斤拷锟?=', '锟斤拷锟斤拷锟斤拷锟?锟?,'锟斤拷 锟斤拷锟斤拷锟斤拷锟?锟?,'锟斤拷 锟斤拷锟斤拷锟斤拷 锟?,'锟斤拷 锟斤拷 锟斤拷锟斤拷锟斤拷 锟?,'锟斤拷锟斤拷锟斤拷锟斤拷 锟?,'锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷锟?锟?,'锟斤拷锟斤拷锟斤拷锟?, '锟斤拷 锟斤拷锟斤拷锟斤拷锟? ],
	    groupOps: [	{ op: "AND", text: " 锟?" },	{ op: "OR",  text: "锟斤拷锟? }	],
		matchText: " 锟斤拷锟斤拷锟斤拷",
		rulesText: " 锟斤拷锟斤拷锟斤拷"
	},
	edit : {
		addCaption: "锟斤拷锟?锟斤拷锟斤拷锟?,
		editCaption: "锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟?,
		bSubmit: "锟斤拷锟斤拷锟斤拷",
		bCancel: "锟斤拷锟斤拷锟?,
		bClose: "锟斤拷锟斤拷锟斤拷锟?,
		saveData: "锟斤拷锟斤拷锟斤拷锟?锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷锟? 锟斤拷 锟斤拷锟斤拷锟斤拷锟?锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷锟?",
		bYes : "锟斤拷",
		bNo : "锟斤拷",
		bExit : "锟斤拷锟斤拷锟?,
		msg: {
		    required:"锟斤拷锟斤拷锟斤拷 锟?锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷",
		    number:"锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟?",
		    minValue:"锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷 锟斤拷 锟?锟斤拷-锟斤拷锟斤拷锟斤拷 锟斤拷锟?锟斤拷锟斤拷锟?锟斤拷",
		    maxValue:"锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷 锟斤拷 锟?锟斤拷-锟斤拷锟斤拷锟?锟斤拷锟?锟斤拷锟斤拷锟?锟斤拷",
		    email: "锟斤拷 锟?锟斤拷锟斤拷锟斤拷锟?锟斤拷. 锟斤拷锟斤拷锟?,
		    integer: "锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷 锟斤拷锟斤拷锟?,
			date: "锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷",
			url: "e 锟斤拷锟斤拷锟斤拷锟斤拷锟?URL. 锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷 锟斤拷锟斤拷锟斤拷锟?'http://' 锟斤拷锟?'https://')",
			nodefined : " 锟?锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷!",
			novalue : " 锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟斤拷锟?锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷!",
			customarray : "锟斤拷锟斤拷锟斤拷. 锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟斤拷 锟斤拷 锟斤拷锟斤拷锟?锟斤拷锟斤拷锟?",
			customfcheck : "锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟斤拷锟?锟?锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟?锟斤拷锟斤拷 锟斤拷锟?锟斤拷锟斤拷锟斤拷锟?"
		}
	},
	view : {
	    caption: "锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟?,
	    bClose: "锟斤拷锟斤拷锟斤拷锟?
	},
	del : {
		caption: "锟斤拷锟斤拷锟斤拷锟斤拷锟?,
		msg: "锟斤拷 锟斤拷锟斤拷锟斤拷 锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟?",
		bSubmit: "锟斤拷锟斤拷锟斤拷",
		bCancel: "锟斤拷锟斤拷锟?
	},
	nav : {
		edittext: " ",
		edittitle: "锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟?,
		addtext:" ",
		addtitle: "锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟?锟斤拷锟斤拷锟?,
		deltext: " ",
		deltitle: "锟斤拷锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟?,
		searchtext: " ",
		searchtitle: "锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟?锟?",
		refreshtext: "",
		refreshtitle: "锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷锟?,
		alertcap: "锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷",
		alerttext: "锟斤拷锟斤拷, 锟斤拷锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟?,
		viewtext: "",
		viewtitle: "锟斤拷锟斤拷锟斤拷锟?锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟?
	},
	col : {
		caption: "锟斤拷锟斤拷锟?锟斤拷锟斤拷锟斤拷",
		bSubmit: "锟斤拷",
		bCancel: "锟斤拷锟斤拷锟?	
	},
	errors : {
		errcap : "锟斤拷锟斤拷锟斤拷",
		nourl : "锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷锟?url 锟斤拷锟斤拷锟?,
		norecords: "锟斤拷锟斤拷 锟斤拷锟斤拷锟?锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷锟?,
		model : "锟斤拷锟斤拷锟斤拷 锟斤拷 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?锟斤拷 锟斤拷锟斤拷锟斤拷锟?"	
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:" 锟斤拷.", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"锟斤拷锟?, "锟斤拷锟?, "锟斤拷", "锟斤拷", "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?,
				"锟斤拷锟斤拷锟斤拷", "锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷", "锟斤拷锟斤拷锟斤拷锟?, "锟斤拷锟斤拷锟?, "锟斤拷锟斤拷锟斤拷锟斤拷锟?, "锟斤拷锟斤拷锟?, "锟斤拷锟斤拷锟斤拷"
			],
			monthNames: [
				"锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?,
				"锟斤拷锟斤拷锟斤拷", "锟斤拷锟斤拷锟斤拷锟斤拷", "锟斤拷锟斤拷", "锟斤拷锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟?, "锟斤拷锟斤拷锟斤拷", "锟斤拷锟斤拷锟斤拷锟斤拷锟?, "锟斤拷锟斤拷锟斤拷锟斤拷", "锟斤拷锟斤拷锟斤拷锟?, "锟斤拷锟斤拷锟斤拷锟斤拷"
			],
			AmPm : ["","","",""],
			S: function (j) {
				if(j==7 || j==8 || j== 27 || j== 28) {
					return '锟斤拷';
				}
				return ['锟斤拷', '锟斤拷', '锟斤拷'][Math.min((j - 1) % 10, 2)];
			},
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
