(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 姝ゆ瑒浣崭笉鍙┖鐧?,
                    "alertTextCheckboxMultiple": "* 璜嬮夫鎿囦竴链嬮爡鐩?,
                    "alertTextCheckboxe": "* 镇ㄥ繀闇€鍕鹃夫姝ゆ瑒浣?,
                    "alertTextDateRange": "* 镞ユ湡绡勫湇娆勪綅閮戒笉鍙┖鐧?
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* 铹℃晥镄?",
                    "alertText2": " 镞ユ湡绡勫湇"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* 铹℃晥镄?",
                    "alertText2": " 鏅傞枔绡勫湇"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* 链€灏?",
                    "alertText2": " 链嫔瓧鍏?
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* 链€澶?",
                    "alertText2": " 链嫔瓧鍏?
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* 浣犲繀闇€阆稿～鍏朵腑涓€链嬫瑒浣?
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 链€灏忓€肩偤 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 链€澶у€肩偤 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* 镞ユ湡蹇呴渶镞╂柤 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* 镞ユ湡蹇呴渶鏅氭柤 "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 链€澶氶夫鍙?",
                    "alertText2": " 链嬮爡鐩?
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 璜嬮夫鍙?",
                    "alertText2": " 链嬮爡鐩?
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 娆勪綅鍏у涓岖浉绗?
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* 镞犳晥镄勪俊鐢ㄥ崱鍙风爜"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* 铹℃晥镄勯浕瑭辫櫉纰?
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* Invalid email address"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 涓嶆槸链夋晥镄勬暣鏁?
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* 铹℃晥镄勬暩瀛?
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 铹℃晥镄勬棩链燂紝镙煎纺蹇呴渶镣?YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 铹℃晥镄?IP 浣嶅潃"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 鍙兘濉暩瀛?
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 鍙帴鍙楄嫳鏂囧瓧姣嶅ぇ灏忓"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* 涓嶆帴鍙楃壒娈婂瓧鍏?
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* 姝ゅ悕绋卞凡缍撹鍏朵粬浜轰娇鐢?,
                    "alertTextLoad": "* 姝ｅ湪纰鸿獚鍚岖ū鏄惁链夊叾浠栦汉浣跨敤锛岃珛绋岖瓑銆?
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 姝ゅ赋铏熷悕绋卞彲浠ヤ娇鐢?,
                    "alertText": "* 姝ゅ赋铏熷悕绋卞凡缍撹鍏朵粬浜轰娇鐢?,
                    "alertTextLoad": "* 姝ｅ湪纰鸿獚甯宠櫉鍚岖ū鏄惁链夊叾浠栦汉浣跨敤锛岃珛绋岖瓑銆?
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* 姝ゅ悕绋卞彲浠ヤ娇鐢?,
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 姝ゅ悕绋卞凡缍撹鍏朵粬浜轰娇鐢?,
                    // speaks by itself
                    "alertTextLoad": "* 姝ｅ湪纰鸿獚鍚岖ū鏄惁链夊叾浠栦汉浣跨敤锛岃珛绋岖瓑銆?
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* 姝ゅ悕绋卞凡缍撹鍏朵粬浜轰娇鐢?,
	                    // speaks by itself
	                    "alertTextLoad": "* 姝ｅ湪纰鸿獚鍚岖ū鏄惁链夊叾浠栦汉浣跨敤锛岃珛绋岖瓑銆?
	                },
                "validate2fields": {
                    "alertText": "* 璜嬭几鍏?HELLO"
                },
	            //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* 铹℃晥镄勬棩链熸牸寮?
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* 铹℃晥镄勬棩链熸垨鏅傞枔镙煎纺",
                    "alertText2": "鍙帴鍙楃殑镙煎纺锛?",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM 鎴?", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            }
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
