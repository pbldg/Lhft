(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* Tr瓢峄渍g n脿y b岷痶 bu峄檆",
                    "alertTextCheckboxMultiple": "* Vui l貌ng ch峄峮 m峄檛 t霉y ch峄峮",
                    "alertTextCheckboxe": "* Checkbox n脿y b岷痶 bu峄檆",
                    "alertTextDateRange": "* C岷?hai tr瓢峄渍g ng脿y th谩ng 胆峄乽 b岷痶 bu峄檆"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Gi谩 tr峄?c峄 tr瓢峄渍g ph岷 l脿 test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* Kh么ng 胆煤ng ",
                    "alertText2": "Kho岷g ng脿y th谩ng"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Kh么ng 胆煤ng ",
                    "alertText2": "Kho岷g th峄涟 gian"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* T峄慽 thi峄僽 ",
                    "alertText2": " s峄?k媒 t峄?胆瓢峄 cho ph茅p"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* T峄慽 胆a ",
                    "alertText2": " s峄?k媒 t峄?胆瓢峄 cho ph茅p"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* B岷 ph岷 胆i峄乶 m峄檛 trong nh峄痭g tr瓢峄渍g sau"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Gi谩 tr峄?nh峄?nh岷 l脿 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Gi谩 tr峄?l峄沶 nh岷 l脿 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Ng脿y k茅o d脿i t峄沬 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Ng脿y 胆茫 qua "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* T峄慽 胆a ",
                    "alertText2": " s峄?t霉y ch峄峮 胆瓢峄 cho ph茅p"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Vui l貌ng ch峄峮 ",
                    "alertText2": " c谩c t霉y ch峄峮"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Gi谩 tr峄?c谩c tr瓢峄渍g kh么ng gi峄忧g nhau"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* S峄?th岷?t铆n d峄g sai"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                    "alertText": "* S峄?胆i峄噉 tho岷 sai"
                },
                "email": {
                    // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                    "regex": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    "alertText": "* 膼峄媋 ch峄?th瓢 胆i峄噉 t峄?sai"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Kh么ng 胆煤ng l脿 s峄?nguy锚n"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* Kh么ng 胆煤ng l脿 s峄?th岷璸 ph芒n"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* Ng脿y sai, ph岷 c贸 胆峄媙h d岷g YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 膼峄媋 ch峄?IP sai"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* URL sai"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Ch峄?胆i峄乶 s峄?
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Ch峄?胆i峄乶 ch峄?
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* Kh么ng 胆瓢峄 ch峄゛ k媒 t峄?胆岷穋 bi峄噒"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* T锚n n脿y 胆瓢峄 d霉ng",
                    "alertTextLoad": "* 膼ang x谩c nh岷璶, vui l貌ng ch峄?
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* T锚n ng瓢峄涟 d霉ng n脿y c贸 th峄?d霉ng 胆瓢峄",
                    "alertText": "* T锚n ng瓢峄涟 d霉ng n脿y 胆茫 胆瓢峄 s峄?d峄g",
                    "alertTextLoad": "* 膼ang x谩c nh岷璶, vui l貌ng ch峄?
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* T锚n n脿y 胆瓢峄 d霉ng",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* T锚n n脿y c贸 th峄?d霉ng",
                    // speaks by itself
                    "alertTextLoad": "* 膼ang x谩c nh岷璶, vui l貌ng ch峄?
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* T锚n n脿y 胆瓢峄 d霉ng",
	                    // speaks by itself
	                    "alertTextLoad": "* 膼ang x谩c nh岷璶, vui l貌ng ch峄?
	                },
                "validate2fields": {
                    "alertText": "* Vui l貌ng nh岷璸 v脿o HELLO"
                },
	            //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Ng脿y sai"
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Ng脿y sai ho岷穋 胆峄媙h d岷g ng脿y sai",
                    "alertText2": "膼峄媙h d岷g 胆煤ng l脿: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM hay ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            }
            };
            
        }
    };

    $.validationEngineLanguage.newLang();
    
})(jQuery);
