;(function($){
/**
 * jqGrid Translation
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "Pregled {0} - {1} od {2}",
		emptyrecords: "Nema zapisa",
		loadtext: "U锟絠tavam...",
		pgtext : "Stranica {0} od {1}"
	},
	search : {
		caption: "pretra锟絠vanje...",
		Find: "Tra锟絠",
		Reset: "Poni锟絫i",
		odata : ['jednak', 'nije identi锟絘n', 'manje', 'manje ili identi锟絥o','ve锟絜','ve锟絜 ili identi锟絥o', 'po锟絠nje sa','ne po锟絠nje sa ','je u','nije u','zavr锟絘va sa','ne zavr锟絘va sa','sadr锟絠','ne sadr锟絠'],
		groupOps: [	{ op: "U", text: "sve" },	{ op: "ILI",  text: "bilo koji" }	],
		matchText: " podudata se",
		rulesText: " pravila"
	},
	edit : {
		addCaption: "Dodaj zapis",
		editCaption: "Promijeni zapis",
		bSubmit: "Preuzmi",
		bCancel: "Odustani",
		bClose: "Zatvri",
		saveData: "Podaci su promijenjeni! Preuzmi promijene?",
		bYes : "Da",
		bNo : "Ne",
		bExit : "Odustani",
		msg: {
			required:"Polje je obavezno",
			number:"Molim, unesite ispravan broj",
			minValue:"vrijednost mora biti ve锟絘 ili identi锟絥a ",
			maxValue:"vrijednost mora biti manja ili identi锟絥a",
			email: "neispravan e-mail",
			integer: "Molim, unjeti ispravan cijeli broj (integer)",
			date: "Molim, unjeti ispravan datum ",
			url: "neispravan URL. Prefiks je obavezan ('http://' or 'https://')",
			nodefined : " nije definiran!",
			novalue : " zahtjevan podatak je obavezan!",
			customarray : "Opcionalna funkcija trebala bi bili polje (array)!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Otvori zapis",
		bClose: "Zatvori"
	},
	del : {
		caption: "Obri锟絠",
		msg: "Obri锟絠 ozna锟絜n zapis ili vi锟絜 njih?",
		bSubmit: "Obri锟絠",
		bCancel: "Odustani"
	},
	nav : {
		edittext: "",
		edittitle: "Promijeni obilje锟絜ni red",
		addtext:"",
		addtitle: "Dodaj novi red",
		deltext: "",
		deltitle: "Obri锟絠 obilje锟絜ni red",
		searchtext: "",
		searchtitle: "Potra锟絠 zapise",
		refreshtext: "",
		refreshtitle: "Ponovo preuzmi podatke",
		alertcap: "Upozorenje",
		alerttext: "Molim, odaberi red",
		viewtext: "",
		viewtitle: "Pregled obilje锟絜nog reda"
	},
	col : {
		caption: "Obilje锟絠 kolonu",
		bSubmit: "Uredu",
		bCancel: "Odustani"
	},
	errors : {
		errcap : "Gre锟绚a",
		nourl : "Nedostaje URL",
		norecords: "Bez zapisa za obradu",
		model : "Duljina colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Ned", "Pon", "Uto", "Sri", "锟絜t", "Pet", "Sub",
				"Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "锟絜tvrtak", "Petak", "Subota"
			],
			monthNames: [
				"Sij", "Vel", "O锟絬", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro",
				"Sije锟絘nj", "Velja锟絘", "O锟絬jak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return ''},
			srcformat: 'Y-m-d',
			newformat: 'd.m.Y.',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "j.n.Y.",
				LongDate: "l, j. F Y",
				FullDateTime: "l, d. F Y G:i:s",
				MonthDay: "d. F",
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
