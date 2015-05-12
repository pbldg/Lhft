;(function($){
/**
 * jqGrid Serbian Translation
 * Александар Миловац(Aleksandar Milovac) aleksandar.milovac@gmail.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "Преглед {0} - {1} од {2}",
		emptyrecords: "Не посто?и ни?едан запис",
		loadtext: "Учитава?е...",
		pgtext : "Страна {0} од {1}"
	},
	search : {
		caption: "Траже?е...",
		Find: "Тражи",
		Reset: "Ресету?",
		odata : ['?еднако', 'ни?е ?еднако', 'ма?е', 'ма?е или ?еднако','ве?е','ве?е или ?еднако', 'почи?е са','не почи?е са','?е у','ни?е у','завршава са','не завршава са','садржи','не садржи'],
		groupOps: [	{ op: "И", text: "сви" },	{ op: "ИЛИ",  text: "сваки" }	],
		matchText: " match",
		rulesText: " правила"
	},
	edit : {
		addCaption: "Дода? запис",
		editCaption: "Измени запис",
		bSubmit: "Поша?и",
		bCancel: "Одустани",
		bClose: "Затвори",
		saveData: "Податак ?е изме?ен! Сачува? измене?",
		bYes : "Да",
		bNo : "Не",
		bExit : "Одустани",
		msg: {
			required:"По?е ?е обавезно",
			number:"Молим, унесите исправан бро?",
			minValue:"вредност мора бити ве?а од или ?еднака са ",
			maxValue:"вредност мора бити ма?а од или ?еднака са",
			email: "ни?е исправна име?л адреса",
			integer: "Молим, унесите исправну целобро?ну вредност ",
			date: "Молим, унесите исправан датум",
			url: "ни?е исправан УРЛ. Потребан ?е префикс ('http://' or 'https://')",
			nodefined : " ни?е дефинисан!",
			novalue : " захтевана ?е повратна вредност!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Погледа? запис",
		bClose: "Затвори"
	},
	del : {
		caption: "Избриши",
		msg: "Избриши изабран(е) запис(е)?",
		bSubmit: "Ибриши",
		bCancel: "Одбаци"
	},
	nav : {
		edittext: "",
		edittitle: "Измени изабрани ред",
		addtext:"",
		addtitle: "Дода? нови ред",
		deltext: "",
		deltitle: "Избриши изабран ред",
		searchtext: "",
		searchtitle: "На?и записе",
		refreshtext: "",
		refreshtitle: "Поново учита? податке",
		alertcap: "Упозоре?е",
		alerttext: "Молим, изаберите ред",
		viewtext: "",
		viewtitle: "Погледа? изабрани ред"
	},
	col : {
		caption: "Изабери колоне",
		bSubmit: "ОК",
		bCancel: "Одбаци"
	},
	errors : {
		errcap : "Грешка",
		nourl : "Ни?е постав?ен URL",
		norecords: "Нема записа за обраду",
		model : "Дужина модела colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб",
				"Неде?а", "Понеде?ак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"
			],
			monthNames: [
				"?ан", "Феб", "Мар", "Апр", "Ма?", "?ун", "?ул", "Авг", "Сеп", "Окт", "Нов", "Дец",
				"?ануар", "Фебруар", "Март", "Април", "Ма?", "?ун", "?ул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
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
