(function($){
    $.fn.validationEngineLanguage = function(){
	};
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 袧械芯斜褏芯写懈屑芯 蟹邪锌芯谢薪懈褌褜",
                    "alertTextCheckboxMultiple": "* 袙褘 写芯谢卸薪褘 胁褘斜褉邪褌褜 胁邪褉懈邪薪褌",
                    "alertTextCheckboxe": "* 袧械芯斜褏芯写懈屑芯 芯褌屑械褌懈褌褜"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* 袦懈薪懈屑褍屑 ",
                    "alertText2": " 褋懈屑胁芯谢邪(芯胁)"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* 袦邪泻褋懈屑褍屑 ",
                    "alertText2": " 褋懈屑胁芯谢邪(芯胁)"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 袦懈薪懈屑邪谢褜薪芯械 蟹薪邪褔械薪懈械 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 袦邪泻褋懈屑邪谢褜薪芯械 蟹薪邪褔械薪懈械 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* 袛邪褌邪 写芯 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* 袛邪褌邪 芯褌 "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 袧械谢褜蟹褟 胁褘斜褉邪褌褜 褋褌芯谢褜泻芯 胁邪褉懈邪薪褌芯胁"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 袩芯卸邪谢褍泄褋褌邪, 胁褘斜械褉懈褌械 ",
                    "alertText2": " 芯锌褑懈褞(懈懈)"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 袩芯谢褟 薪械 褋芯胁锌邪写邪褞褌"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* 袧械胁械褉薪褘泄 薪芯屑械褉 泻褉械写懈褌薪芯泄 泻邪褉褌褘"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* 袧械锌褉邪胁懈谢褜薪褘泄 褎芯褉屑邪褌 褌械谢械褎芯薪邪"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* 袧械胁械褉薪褘泄 褎芯褉屑邪褌 email"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 袧械 褑械谢芯械 褔懈褋谢芯"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* 袧械锌褉邪胁懈谢褜薪芯械 褔懈褋谢芯 褋 锌谢邪胁邪褞褖械泄 褌芯褔泻芯泄"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 袧械锌褉邪胁懈谢褜薪邪褟 写邪褌邪 (写芯谢卸薪芯 斜褘褌褜 胁 袛袛.MM.袚袚袚袚 褎芯褉屑邪褌械)"
                },
                "ipv4": {
                	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 袧械锌褉邪胁懈谢褜薪褘泄 IP-邪写褉械褋"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* 袧械锌褉邪胁懈谢褜薪褘泄 URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 孝芯谢褜泻芯 褔懈褋谢邪"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\u0400-\u04FF\ \']+$/,
                    "alertText": "* 孝芯谢褜泻芯 斜褍泻胁褘"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z\u0400-\u04FF]+$/,
                    "alertText": "* 袟邪锌褉械褖械薪褘 褋锌械褑懈邪谢褜薪褘械 褋懈屑胁芯谢褘"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* 协褌芯褌 锌芯谢褜蟹芯胁邪褌械谢褜 褍卸械 蟹邪薪褟褌",
                    "alertTextLoad": "* 袩褉芯胁械褉泻邪, 锌芯写芯卸写懈褌械..."
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* 协褌芯 懈屑褟 褍卸械 蟹邪薪褟褌芯",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* 协褌芯 懈屑褟 写芯褋褌褍锌薪芯",
                    // speaks by itself
                    "alertTextLoad": "* 袩褉芯胁械褉泻邪, 锌芯写芯卸写懈褌械..."
                },
                "validate2fields": {
                    "alertText": "* 袩芯卸邪谢褍泄褋褌邪, 胁胁械写懈褌械 HELLO"
                }
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);

