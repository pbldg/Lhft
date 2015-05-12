;/*****************************************************************
 * Japanese language file for jquery.validationEngine.js (ver2.0)
 *
 * Transrator: tomotomo ( Tomoyuki SUGITA )
 * http://tomotomoSnippet.blogspot.com/
 * Licenced under the MIT Licence
 *******************************************************************/
(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 蹇呴爤阕呯洰銇с仚",
                    "alertTextCheckboxMultiple": "* 阆告姙銇椼仸銇忋仩銇曘亜",
                    "alertTextCheckboxe": "* 銉并偋銉冦偗銉溿儍銈偣銈掋儊銈с儍銈仐銇︺亸銇犮仌銇?
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "鏂囧瓧浠ヤ笂銇仐銇︺亸銇犮仌銇?
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "鏂囧瓧浠ヤ笅銇仐銇︺亸銇犮仌銇?
                },
                "min": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 浠ヤ笂銇暟链ゃ伀銇椼仸銇忋仩銇曘亜"
                },
                "max": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 浠ヤ笅銇暟链ゃ伀銇椼仸銇忋仩銇曘亜"
                },
                "past": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 銈堛倞阆庡幓銇棩浠朴伀銇椼仸銇忋仩銇曘亜"
                },
                "future": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 銈堛倞链€杩戙伄镞ヤ粯銇仐銇︺亸銇犮仌銇?
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 銉并偋銉冦偗銇椼仚銇庛仹銇?
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "銇や互涓娿儊銈с儍銈仐銇︺亸銇犮仌銇?
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 鍏ュ姏銇曘倢銇熷€ゃ亴涓€镊淬仐銇俱仜銈?
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* 铹″姽銇偗銉偢銉冦儓銈兖銉夌阳鍙?
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                    "alertText": "* 板昏┍鐣佛銇屾銇椼亸銇伞倞銇俱仜銈?
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* 銉°兖銉偄銉夈罗銈广亴姝ｃ仐銇忋亗銈娿伨銇涖倱"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 鏁存暟銈掑崐瑙掋仹鍏ュ姏銇椼仸銇忋仩銇曘亜"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText": "* 鏁板€ゃ倰鍗婅銇у叆锷涖仐銇︺亸銇犮仌銇?
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 镞ヤ粯銇崐瑙掋仹 YYYY-MM-DD 銇舰寮忋仹鍏ュ姏銇椼仸銇忋仩銇曘亜"
                },
                "ipv4": {
                	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* IP銈俦銉偣銇屾銇椼亸銇伞倞銇俱仜銈?
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* URL銇屾銇椼亸銇伞倞銇俱仜銈?
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 鍗婅鏁板瓧銇у叆锷涖仐銇︺亸銇犮仌銇?
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 鍗婅銈俪銉曘偂銉欍儍銉堛仹鍏ュ姏銇椼仸銇忋仩銇曘亜"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* 鍗婅鑻辨暟銇у叆锷涖仐銇︺亸銇犮仌銇?
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
                "validate2fields": {
                    "alertText": "* 銆嶩ELLO銆忋仺鍏ュ姏銇椼仸銇忋仩銇曘亜"
                }
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);


    
