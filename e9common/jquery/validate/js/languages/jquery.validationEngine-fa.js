(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 丕蹖賳 賮蹖賱丿 囟乇賵乇蹖 丕爻鬲",
                    "alertTextCheckboxMultiple": "* 賱胤賮丕 蹖讴 诏夭蹖賳赖 乇丕 丕賳鬲禺丕亘 讴賳蹖丿",
                    "alertTextCheckboxe": "* 丕蹖賳 趩讴 亘丕讴爻 囟乇賵乇蹖 丕爻鬲",
                    "alertTextDateRange": "* 赖乇 丿賵 賮蹖賱丿钬属囏й?亘丕夭赖钬屰?鬲丕乇蹖禺蹖 囟乇賵乇蹖 赖爻鬲賳丿"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* 亘丕夭赖钬屰?鬲丕乇蹖禺蹖 ",
                    "alertText2": "賳丕賲毓鬲亘乇"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* 亘丕夭赖钬屰?夭賲丕賳蹖",
                    "alertText2": "賳丕賲毓鬲亘乇"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* 丨丿丕賯賱 ",
                    "alertText2": " 丨乇賮 囟乇賵乇蹖 丕爻鬲"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* 丨丿丕讴孬乇 ",
                    "alertText2": " 丨乇賮 賵丕乇丿 讴賳蹖丿"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* 卮賲丕 亘丕蹖丿 蹖讴蹖 丕夭 賮蹖賱丿钬属囏й?夭蹖乇 乇丕 倬乇 讴賳蹖丿"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 讴賲鬲乇蹖賳 賲賯丿丕乇 賲毓鬲亘乇 ",
					"alertText2": " 丕爻鬲"
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 亘蹖卮钬屫臂属?賲賯丿丕乇 賲毓鬲亘乇 ",
					"alertText2": "丕爻鬲"
                },
                "past": {
                    "regex": "none",
                    "alertText": "* 鬲丕乇蹖禺钬属囏й?賯亘賱 丕夭 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* 鬲丕乇蹖禺钬属囏й?亘毓丿 丕夭 "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 亘蹖卮钬屫臂属?诏夭蹖賳赖钬屰?賯丕亘賱 丕賳鬲禺丕亘 ",
                    "alertText2": " 丕爻鬲"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 賱胤賮丕 ",
                    "alertText2": " 賲賵乇丿 丕賳鬲禺丕亘 讴賳蹖丿"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 賮蹖賱丿 賳丕賲毓鬲亘乇 丕爻鬲"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "卮賲丕乇赖 讴丕乇鬲 丕毓鬲亘丕乇蹖 丕卮鬲亘丕赖"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* 卮賲丕乇赖 鬲賱賮賳 賲毓鬲亘乇 賵丕乇丿 讴賳蹖丿"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* 賳卮丕賳蹖 丕賱讴鬲乇賵賳蹖讴蹖 賲毓鬲亘乇 賵丕乇丿 讴賳蹖丿"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 毓丿丿 賲毓鬲亘乇 賵丕乇丿 讴賳蹖丿"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* 毓丿丿 丕毓卮丕乇蹖 賲毓鬲亘乇 賵丕乇丿 讴賳蹖丿"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 鬲丕乇蹖禺 亘丕蹖丿 亘赖 卮讴賱 爻丕賱/賲丕赖/乇賵夭"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* IP 賲毓鬲亘乇 賵丕乇丿 讴賳蹖丿"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* 賳卮丕賳蹖 賲毓鬲亘乇 賵丕乇丿 讴賳蹖丿"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 賮賯胤 丕毓丿丕丿"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 賮賯胤 丨乇賵賮 丕賳诏賱蹖爻蹖"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* 賮賯胤 丕毓丿丕丿 賵 丨乇賵賮 丕賳诏賱蹖爻蹖 賵丕乇丿 讴賳蹖丿"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* 丕蹖賳 賳丕賲钬屭┴ж必ㄘ臂?鬲讴乇丕乇蹖 丕爻鬲",
                    "alertTextLoad": "* 丿乇丨丕賱 丕毓鬲亘丕乇 爻賳噩蹖貙 賱胤賮丕 氐亘乇 讴賳蹖丿"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 丕蹖賳 賳丕賲 讴丕乇亘乇蹖 丌夭丕丿 丕爻鬲",
                    "alertText": "* 丕蹖賳 賳丕賲钬屭┴ж必ㄘ臂?鬲讴乇丕乇蹖 丕爻鬲",
                    "alertTextLoad": "* 丿乇丨丕賱 丕毓鬲亘丕乇 爻賳噩蹖貙 賱胤賮丕 氐亘乇 讴賳蹖丿"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* 丕蹖賳 賳丕賲 倬蹖卮钬屫?孬亘鬲 卮丿赖 丕爻鬲",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 丕蹖賳 賳丕賲 丌夭丕丿 丕爻鬲",
                    // speaks by itself
                    "alertTextLoad": "* 丿乇丨丕賱 丕毓鬲亘丕乇 爻賳噩蹖貙 賱胤賮丕 氐亘乇 讴賳蹖丿"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* 丕蹖賳 賳丕賲 鬲讴乇丕乇蹖 丕爻鬲",
	                    // speaks by itself
	                    "alertTextLoad": "* 丿乇丨丕賱 丕毓鬲亘丕乇 爻賳噩蹖貙 賱胤賮丕 氐亘乇 讴賳蹖丿"
	                },
                "validate2fields": {
                    "alertText": "* 賱胤賮丕 賲賯丿丕乇 HELLO 乇丕 賵丕乇丿 讴賳蹖丿"
                },
	            //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* 鬲丕乇蹖禺 賳丕賲毓鬲亘乇"
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* 鬲丕乇蹖禺 賳丕賲毓鬲亘乇 丕爻鬲 蹖丕 卮讴賱 賲毓鬲亘乇蹖 賳丿丕乇丿",
                    "alertText2": "卮讴賱钬属囏й?賲賵乇丿 賲毓鬲亘乇: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            }
            };
            
        }
    };

    $.validationEngineLanguage.newLang();
    
})(jQuery);