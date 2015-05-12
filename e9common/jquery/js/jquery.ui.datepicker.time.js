/*
* jQuery timepicker addon
* By: Trent Richardson [http://trentrichardson.com]
* Version 1.0.1
* Last Modified: 07/01/2012
*
* Copyright 2012 Trent Richardson
* You may use this project under MIT or GPL licenses.
* http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
* http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
*
* HERES THE CSS:
* .ui-timepicker-div .ui-widget-header { margin-bottom: 8px; }
* .ui-timepicker-div dl { text-align: left; }
* .ui-timepicker-div dl dt { height: 25px; margin-bottom: -25px; }
* .ui-timepicker-div dl dd { margin: 0 10px 10px 65px; }
* .ui-timepicker-div td { font-size: 90%; }
* .ui-tpicker-grid-label { background: none; border: none; margin: 0; padding: 0; }
*/

/*jslint evil: true, maxlen: 300, white: false, undef: false, nomen: false, onevar: false */

(function($) {

// Prevent "Uncaught RangeError: Maximum call stack size exceeded"
$.ui.timepicker = $.ui.timepicker || {};
if ($.ui.timepicker.version) {
	return;
}

$.extend($.ui, { timepicker: { version: "1.0.1" } });

/* Time picker manager.
   Use the singleton instance of this class, $.timepicker, to interact with the time picker.
   Settings for (groups of) time pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Timepicker() {
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		currentText: 'Now',
		closeText: 'Done',
		ampm: false,
		amNames: ['AM', 'A'],
		pmNames: ['PM', 'P'],
		timeFormat: 'hh:mm tt',
		timeSuffix: '',
		timeOnlyTitle: 'Choose Time',
		timeText: 'Time'
	};
	this._defaults = { // Global defaults for all the datetime picker instances
		showButtonPanel: true,
		timeOnly: false,
		showHour: true,
		showMinute: true,
		showSecond: false,
		showTime: true,
		hour: 0,
		minute: 0,
		second: 0,
		hourMin: 0,
		minuteMin: 0,
		secondMin: 0,
		hourMax: 23,
		minuteMax: 59,
		secondMax: 59,
		minDateTime: null,
		maxDateTime: null,
		onSelect: null,
		alwaysSetTime: true,
		separator: ' ',
		altFieldTimeOnly: true,
		showTimepicker: true,
		sliderAccessArgs: null
	};
	$.extend(this._defaults, this.regional['']);
}

$.extend(Timepicker.prototype, {
	$input: null,
	$altInput: null,
	$timeObj: null,
	inst: null,
	$hourInput: null,
	$minuteInput: null,
	$secondInput: null,
	hour: 0,
	minute: 0,
	second: 0,
	hourMinOriginal: null,
	minuteMinOriginal: null,
	secondMinOriginal: null,
	hourMaxOriginal: null,
	minuteMaxOriginal: null,
	secondMaxOriginal: null,
	ampm: '',
	formattedDate: '',
	formattedTime: '',
	formattedDateTime: '',

	/* Override the default settings for all instances of the time picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	//########################################################################
	// Create a new Timepicker instance
	//########################################################################
	_newInst: function($input, o) {
		var tp_inst = new Timepicker(),
			inlineSettings = {};

		for (var attrName in this._defaults) {
			var attrValue = $input.attr('time:' + attrName);
			if (attrValue) {
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, o, {
			beforeShow: function(input, dp_inst) {
				if ($.isFunction(o.beforeShow)) {
					return o.beforeShow(input, dp_inst, tp_inst);
                }
			},
			onChangeMonthYear: function(year, month, dp_inst) {
				// Update the time as well : this prevents the time from disappearing from the $input field.
				tp_inst._updateDateTime(dp_inst);
				if ($.isFunction(o.onChangeMonthYear)) {
					o.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst);
                }
			},
			onClose: function(dateText, dp_inst) {
				if (tp_inst.timeDefined === true && $input.val() !== '') {
					tp_inst._updateDateTime(dp_inst);
                }
				if ($.isFunction(o.onClose)) {
					o.onClose.call($input[0], dateText, dp_inst, tp_inst);
                }
			},
			timepicker: tp_inst // add timepicker as a property of datepicker: $.datepicker._get(dp_inst, 'timepicker');
		});
		tp_inst.amNames = $.map(tp_inst._defaults.amNames, function(val) { return val.toUpperCase(); });
		tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function(val) { return val.toUpperCase(); });

		tp_inst.hour = tp_inst._defaults.hour;
		tp_inst.minute = tp_inst._defaults.minute;
		tp_inst.second = tp_inst._defaults.second;
		tp_inst.ampm = '';
		tp_inst.$input = $input;

		if (o.altField) {
			tp_inst.$altInput = $(o.altField)
				.css({ cursor: 'pointer' })
				.focus(function(){ $input.trigger("focus"); });
        }

		if(tp_inst._defaults.minDate===0 || tp_inst._defaults.minDateTime===0)
		{
			tp_inst._defaults.minDate=new Date();
		}
		if(tp_inst._defaults.maxDate===0 || tp_inst._defaults.maxDateTime===0)
		{
			tp_inst._defaults.maxDate=new Date();
		}

		// datepicker needs minDate/maxDate, timepicker needs minDateTime/maxDateTime..
		if(tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date) {
			tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime());
        }
		if(tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date) {
			tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime());
        }
		if(tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date) {
			tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime());
        }
		if(tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date) {
			tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime());
        }
		return tp_inst;
	},

	//########################################################################
	// add our sliders to the calendar
	//########################################################################
	_addTimePicker: function(dp_inst) {
		var currDT = (this.$altInput && this._defaults.altFieldTimeOnly) ?
				this.$input.val() + ' ' + this.$altInput.val() :
				this.$input.val();

		this.timeDefined = this._parseTime(currDT);
		this._limitMinMaxDateTime(dp_inst);
		this._injectTimePicker();
	},

	//########################################################################
	// parse the time string from input value or _setTime
	//########################################################################
	_parseTime: function(timeString, withDate) {
		if (!this.inst) {
			this.inst = $.datepicker._getInst(this.$input[0]);
		}
		
		if (withDate || !this._defaults.timeOnly) 
		{
			var dp_dateFormat = $.datepicker._get(this.inst, 'dateFormat');
			try {
				var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
				if (!parseRes.timeObj) { return false; }
				$.extend(this, parseRes.timeObj);
			} catch (err)
			{
				return false;
			}
			return true;
		}
		else
		{
			var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
			if(!timeObj) { return false; }
			$.extend(this, timeObj);
			return true;
		}
	},
	
	//########################################################################
	// generate and inject html for timepicker into ui datepicker
	//########################################################################
	_injectTimePicker: function() {
		var $dp = this.inst.dpDiv,
			o = this._defaults,
			tp_inst = this,
			dp_id = this.inst.id.toString().replace(/([^A-Za-z0-9_])/g, '');

		// Prevent displaying twice
		if ($dp.find("div#ui-timepicker-div-"+ dp_id).length === 0 && o.showTimepicker) {
			var noDisplay = ' style="display:none;"',
				hourInputId = 'ui_tpicker_hour_'+ dp_id,
				minuteInputId = 'ui_tpicker_minute_'+ dp_id,
				secondInputId = 'ui_tpicker_second_'+ dp_id,
				hourDivId = 'ui_tpicker_hour_menu_'+ dp_id,
				minuteDivId = 'ui_tpicker_minute_menu_'+ dp_id,
				secondDivId = 'ui_tpicker_second_menu_'+ dp_id, 
				hourInput = "<input id='" + hourInputId + "' class='tB' maxlength='2' value='" + tp_inst.hour + "' />",
				minuteInput = "<input id='" + minuteInputId + "' class='" + ((o.showSecond) ? "tE" : "tS") + "' maxlength='2' value='" + tp_inst.minute + "' />",
				secondInput = "<input id='" + secondInputId + "' class='tS' maxlength='2' value='" + tp_inst.second + "' " + ((o.showSecond) ? '' : noDisplay) + "/>",
				hourSelDiv = "<div id='" + hourDivId + "' class='menuSel hhMenu' ><table cellspacing='0' cellpadding='3'><tbody><tr>",
				minuteSelDiv = "<div id='" + minuteDivId + "' class='menuSel mmMenu' ><table cellspacing='0' cellpadding='3'><tbody><tr>",
				secondSelDiv = "<div id='" + secondDivId + "' class='menuSel ssMenu' ><table cellspacing='0' cellpadding='3'><tbody><tr>";
		
			//构建小时选择框内容
			for ( var i = 0; i < 24; i++) {
				if(i > 0 && i%6 == 0)
					hourSelDiv = hourSelDiv + "</tr><tr>";
				
				hourSelDiv = hourSelDiv + "<td class='menu' onmouseover='this.className=\"menuOn\"' onmouseout='this.className=\"menu\"'" +
						" onmousedown='" + hourInputId + ".value=" + i + ";'>" + i + "</td>";
			}
			hourSelDiv = hourSelDiv + "</tr></tbody></table></div>"; 
			
			//构建分钟选择框内容
			for ( var i = 0; i < 12; i++) {
				if(i == 6)
					minuteSelDiv = minuteSelDiv + "</tr><tr>";
				
				var min = parseInt(i)*5;
				minuteSelDiv = minuteSelDiv + "<td class='menu' onmouseover='this.className=\"menuOn\"' onmouseout='this.className=\"menu\"'" +
				" onmousedown='" + minuteInputId + ".value=" + min + ";'>" + min + "</td>";
			}
			minuteSelDiv = minuteSelDiv + "</tr></tbody></table></div>"; 
			
			//构建秒选择框内容
			for ( var i = 0; i < 6; i++) {
				if(i == 6)
					secondSelDiv = secondSelDiv + "</tr><tr>";
				
				var sec = parseInt(i)*10;
				secondSelDiv = secondSelDiv + "<td class='menu' onmouseover='this.className=\"menuOn\"' onmouseout='this.className=\"menu\"'" +
				" onmousedown='" + secondInputId + ".value=" + sec + ";'>" + sec + "</td>";
			}
			secondSelDiv = secondSelDiv + "</tr></tbody></table></div>"; 
	
			var timeDiv = " <div class='dpTime'>" 
				+ hourSelDiv
				+ minuteSelDiv
				+ secondSelDiv
				+ "<table cellspacing='0' cellpadding='0' border='0'><tbody><tr><td>"
				+ "<dt class='ui_tpicker_time_label' id='ui_tpicker_time_label_'" + dp_id + "'>" + o.timeText + "&nbsp;"
				+ hourInput
				+ "<input value=':' class='tm' readonly />"
				+ minuteInput
				+ "<input value=':' class='tm' readonly " + ((o.showSecond) ? '' : noDisplay) + " />"
				+ secondInput 
				+ "</dt></td></tr></tbody></table>"
				+ "</div> ";
			
			//加入到日期选择和按钮中间
			var $tp = $(timeDiv);
			
			tp_inst.$hourInput = $tp.find("#" + hourInputId);
			tp_inst.$minuteInput = $tp.find("#" + minuteInputId);
			tp_inst.$secondInput = $tp.find("#" + secondInputId);
			
			tp_inst.$hourInput.focus(function(){
				$("#" + hourDivId).slideDown("fast");
			}).blur(function(){
				if(this.value > o.hourMax)
					this.value = o.hourMax;
				tp_inst._onTimeChange();
				$("#" + hourDivId).css("display", "none");
			}).keydown(function(event){//时间 只能输入数字和删除键、tab键
				return timeLimitInput(event);
			});
			
			tp_inst.$minuteInput.focus(function(){
				$("#" + minuteDivId).slideDown("fast");
			}).blur(function(){
				if(this.value > o.minuteMax)
					this.value = o.minuteMax;
				tp_inst._onTimeChange();
				$("#" + minuteDivId).css("display", "none");
			}).keydown(function(event){//时间 只能输入数字和删除键、tab键
				return timeLimitInput(event);
			});
			
			tp_inst.$secondInput.focus(function(){
				$("#" + secondDivId).slideDown("fast");
			}).blur(function(){
				if(this.value > o.secondMax)
					this.value = o.secondMax;
				tp_inst._onTimeChange();
				$("#" + secondDivId).css("display", "none");
			}).keydown(function(event){//时间 只能输入数字和删除键、tab键
				return timeLimitInput(event);
			});
			
			//聚焦时自动跳入下一个时间输入框
			$tp.find(".tm").focus(function(){
				$(this).next("input").focus().select();
			});

			var $buttonPanel = $dp.find('.ui-datepicker-buttonpane');
			if ($buttonPanel.length) { $buttonPanel.before($tp); }
			else { $dp.append($tp); }

			this.$timeObj = $tp.find('#ui_tpicker_time_'+ dp_id);

			if (this.inst !== null) {
				var timeDefined = this.timeDefined;
				this._onTimeChange();
				this.timeDefined = timeDefined;
			}
		}
	},

	//########################################################################
	// This function tries to limit the ability to go outside the
	// min/max date range
	//########################################################################
	_limitMinMaxDateTime: function(dp_inst){
		var o = this._defaults,
			dp_date = new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay);

		if(!this._defaults.showTimepicker) { return; } // No time so nothing to check here

		if($.datepicker._get(dp_inst, 'minDateTime') !== null && $.datepicker._get(dp_inst, 'minDateTime') !== undefined && dp_date){
			var minDateTime = $.datepicker._get(dp_inst, 'minDateTime'),
				minDateTimeDate = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0);

			if(this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null){
				this.hourMinOriginal = o.hourMin;
				this.minuteMinOriginal = o.minuteMin;
				this.secondMinOriginal = o.secondMin;
			}

			if(dp_inst.settings.timeOnly || minDateTimeDate.getTime() == dp_date.getTime()) {
				this._defaults.hourMin = minDateTime.getHours();
				if (this.hour <= this._defaults.hourMin) {
					this.hour = this._defaults.hourMin;
					this._defaults.minuteMin = minDateTime.getMinutes();
					if (this.minute <= this._defaults.minuteMin) {
						this.minute = this._defaults.minuteMin;
						this._defaults.secondMin = minDateTime.getSeconds();
					} else if (this.second <= this._defaults.secondMin){
						this.second = this._defaults.secondMin;
					}
				} else {
					this._defaults.minuteMin = this.minuteMinOriginal;
					this._defaults.secondMin = this.secondMinOriginal;
				}
			}else{
				this._defaults.hourMin = this.hourMinOriginal;
				this._defaults.minuteMin = this.minuteMinOriginal;
				this._defaults.secondMin = this.secondMinOriginal;
			}
		}

		if($.datepicker._get(dp_inst, 'maxDateTime') !== null && $.datepicker._get(dp_inst, 'maxDateTime') !== undefined && dp_date){
			var maxDateTime = $.datepicker._get(dp_inst, 'maxDateTime'),
				maxDateTimeDate = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0);

			if(this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null){
				this.hourMaxOriginal = o.hourMax;
				this.minuteMaxOriginal = o.minuteMax;
				this.secondMaxOriginal = o.secondMax;
			}

			if(dp_inst.settings.timeOnly || maxDateTimeDate.getTime() == dp_date.getTime()){
				this._defaults.hourMax = maxDateTime.getHours();
				if (this.hour >= this._defaults.hourMax) {
					this.hour = this._defaults.hourMax;
					this._defaults.minuteMax = maxDateTime.getMinutes();
					if (this.minute >= this._defaults.minuteMax) {
						this.minute = this._defaults.minuteMax;
						this._defaults.secondMax = maxDateTime.getSeconds();
					} else if (this.second >= this._defaults.secondMax) {
						this.second = this._defaults.secondMax;
					}
				} else {
					this._defaults.minuteMax = this.minuteMaxOriginal;
					this._defaults.secondMax = this.secondMaxOriginal;
				}
			}else{
				this._defaults.hourMax = this.hourMaxOriginal;
				this._defaults.minuteMax = this.minuteMaxOriginal;
				this._defaults.secondMax = this.secondMaxOriginal;
			}
		}
	},


	//########################################################################
	// when a slider moves, set the internal time...
	// on time change is also called when the time is updated in the text field
	//########################################################################
	_onTimeChange: function() {
		var hour = this.$hourInput.val(),
			minute = this.$minuteInput.val(),
			second = this.$secondInput.val(),
			o = this._defaults; 

		var ampm = o[hour < 12 ? 'amNames' : 'pmNames'][0];

		// If the update was done in the input field, the input field should not be updated.
		// If the update was done using the sliders, update the input field.
		var hasChanged = (hour != this.hour || minute != this.minute ||
				second != this.second || 
				(this.ampm.length > 0 && (hour < 12) != ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1)) );
 
		if (hasChanged) {
			if (hour !== false) { this.hour = hour; }
			if (minute !== false) { this.minute = minute; }
			if (second !== false) { this.second = second; }
			if (!this.inst) { this.inst = $.datepicker._getInst(this.$input[0]); }

			this._limitMinMaxDateTime(this.inst);
		}
		if (o.ampm) { this.ampm = ampm; }

		this.formattedTime = $.datepicker.formatTime(this._defaults.timeFormat, this, this._defaults);
		if (this.$timeObj) { this.$timeObj.text(this.formattedTime + o.timeSuffix); }
		this.timeDefined = true;
		if (hasChanged) { this._updateDateTime(); }
	},

	//########################################################################
	// update our input with the new date time..
	//########################################################################
	_updateDateTime: function(dp_inst) {
		dp_inst = this.inst || dp_inst;
		var dt = $.datepicker._daylightSavingAdjust(new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay)),
			dateFmt = $.datepicker._get(dp_inst, 'dateFormat'),
			formatCfg = $.datepicker._getFormatConfig(dp_inst),
			timeAvailable = dt !== null && this.timeDefined;
		this.formattedDate = $.datepicker.formatDate(dateFmt, (dt === null ? new Date() : dt), formatCfg);
		var formattedDateTime = this.formattedDate;
		// remove following lines to force every changes in date picker to change the input value
		// Bug descriptions: when an input field has a default value, and click on the field to pop up the date picker. 
		// If the user manually empty the value in the input field, the date picker will never change selected value.
		//if (dp_inst.lastVal !== undefined && (dp_inst.lastVal.length > 0 && this.$input.val().length === 0)) {
		//	return;
        //}

		if (this._defaults.timeOnly === true) {
			formattedDateTime = this.formattedTime;
		} else if (this._defaults.timeOnly !== true && (this._defaults.alwaysSetTime || timeAvailable)) {
			formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix;
		}

		this.formattedDateTime = formattedDateTime;

		if(!this._defaults.showTimepicker) {
			this.$input.val(this.formattedDate);
		} else if (this.$altInput && this._defaults.altFieldTimeOnly === true) {
			this.$altInput.val(this.formattedTime);
			this.$input.val(this.formattedDate);
		} else if(this.$altInput) {
			this.$altInput.val(formattedDateTime);
			this.$input.val(formattedDateTime);
		} else {
			this.$input.val(formattedDateTime);
		}

		//时间变更后，让文本框聚焦，方便验证
		if($.datepicker._datepickerShowing)
			this.$input.focus();
		this.$input.trigger("change");
	}

});

$.fn.extend({
	//########################################################################
	// extend timepicker to datepicker
	//########################################################################
	datetimepicker: function(o) {
		o = o || {};
		var tmp_args = arguments;

		if (typeof(o) == 'string'){
			if(o == 'getDate') {
				return $.fn.datepicker.apply($(this[0]), tmp_args);
            }
			else {
				return this.each(function() {
					var $t = $(this);
					$t.datepicker.apply($t, tmp_args);
				});
            }
		}
		else {
			return this.each(function() {
				var $t = $(this);
				$t.datepicker($.timepicker._newInst($t, o)._defaults);
			});
        }
	}
});

$.datepicker.parseDateTime = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
	var parseRes = parseDateTimeInternal(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings);
	if (parseRes.timeObj)
	{
		var t = parseRes.timeObj;
		parseRes.date.setHours(t.hour, t.minute, t.second);
	}

	return parseRes.date;
};

$.datepicker.parseTime = function(timeFormat, timeString, options) {
	
	//########################################################################
	// pattern for standard and localized AM/PM markers
	//########################################################################
	var getPatternAmpm = function(amNames, pmNames) {
		var markers = [];
		if (amNames) {
			$.merge(markers, amNames);
        }
		if (pmNames) {
			$.merge(markers, pmNames);
        }
		markers = $.map(markers, function(val) { return val.replace(/[.*+?|()\[\]{}\\]/g, '\\$&'); });
		return '(' + markers.join('|') + ')?';
	};
   
	//########################################################################
	// figure out position of time elements.. cause js cant do named captures
	//########################################################################
	var getFormatPositions = function( timeFormat ) {
		var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),
			orders = { h: -1, m: -1, s: -1, l: -1, t: -1, z: -1 };

		if (finds) {
			for (var i = 0; i < finds.length; i++) {
				if (orders[finds[i].toString().charAt(0)] == -1) {
					orders[finds[i].toString().charAt(0)] = i + 1;
                }
            }
        }
		return orders;
	};
    
	var o = extendRemove(extendRemove({}, $.timepicker._defaults), options || {});
    
	var regstr = '^' + timeFormat.toString()
			.replace(/h{1,2}/ig, '(\\d?\\d)')
			.replace(/m{1,2}/ig, '(\\d?\\d)')
			.replace(/s{1,2}/ig, '(\\d?\\d)')
			.replace(/l{1}/ig, '(\\d?\\d?\\d)')
			.replace(/t{1,2}/ig, getPatternAmpm(o.amNames, o.pmNames))
			.replace(/z{1}/ig, '(z|[-+]\\d\\d:?\\d\\d)?')
			.replace(/\s/g, '\\s?') + o.timeSuffix + '$',
		order = getFormatPositions(timeFormat),
		ampm = '',
		treg;

	treg = timeString.match(new RegExp(regstr, 'i'));

	var resTime = {hour: 0, minute: 0, second: 0};
    
	if (treg) {
		if (order.t !== -1) {
			if (treg[order.t] === undefined || treg[order.t].length === 0) {
				ampm = '';
				resTime.ampm = '';
			} else {
				ampm = $.inArray(treg[order.t], o.amNames) !== -1 ? 'AM' : 'PM';
				resTime.ampm = o[ampm == 'AM' ? 'amNames' : 'pmNames'][0];
			}
		}

		if (order.h !== -1) {
			if (ampm == 'AM' && treg[order.h] == '12') {
				resTime.hour = 0; // 12am = 0 hour
			} else {
                if (ampm == 'PM' && treg[order.h] != '12') {
                    resTime.hour = parseInt(treg[order.h],10) + 12; // 12pm = 12 hour, any other pm = hour + 12
                }
                else { resTime.hour = Number(treg[order.h]); }
            }
		}

		if (order.m !== -1) { resTime.minute = Number(treg[order.m]); }
		if (order.s !== -1) { resTime.second = Number(treg[order.s]); }

		return resTime;
	}

	return false;
};

//########################################################################
// format the time all pretty...
// format = string format of the time
// time = a {}, not a Date() for timezones
// options = essentially the regional[].. amNames, pmNames, ampm
//########################################################################
$.datepicker.formatTime = function(format, time, options) {
	options = options || {};
	options = $.extend($.timepicker._defaults, options);
	time = $.extend({hour:0, minute:0, second:0 }, time);

	var tmptime = format;
	var ampmName = options.amNames[0];

	var hour = parseInt(time.hour, 10);
	if (options.ampm) {
		if (hour > 11){
			ampmName = options.pmNames[0];
			if(hour > 12) {
				hour = hour % 12;
            }
		}
		if (hour === 0) {
			hour = 12;
        }
	}
	tmptime = tmptime.replace(/(?:hh?|mm?|ss?|[tT]{1,2}|[lz])/g, function(match) {
		switch (match.toLowerCase()) {
			case 'hh': return ('0' + hour).slice(-2);
			case 'h':  return hour;
			case 'mm': return ('0' + time.minute).slice(-2);
			case 'm':  return time.minute;
			case 'ss': return ('0' + time.second).slice(-2);
			case 's':  return time.second;
			case 'l':  return ('00' + time.millisec).slice(-3);
			case 'z':  return time.timezone;
			case 't': case 'tt':
				if (options.ampm) {
					if (match.length == 1) {
						ampmName = ampmName.charAt(0);
                    }
					return match.charAt(0) == 'T' ? ampmName.toUpperCase() : ampmName.toLowerCase();
				}
				return '';
		}
	});

	tmptime = $.trim(tmptime);
	return tmptime;
};

//########################################################################
// the bad hack :/ override datepicker so it doesnt close on select
// inspired: http://stackoverflow.com/questions/1252512/jquery-datepicker-prevent-closing-picker-when-clicking-a-date/1762378#1762378
//########################################################################
$.datepicker._base_selectDate = $.datepicker._selectDate;
$.datepicker._selectDate = function (id, dateStr) {
	var inst = this._getInst($(id)[0]),
		tp_inst = this._get(inst, 'timepicker');

	if (tp_inst) {
		tp_inst._limitMinMaxDateTime(inst);
		inst.inline = inst.stay_open = true;
		//This way the onSelect handler called from calendarpicker get the full dateTime
		this._base_selectDate(id, dateStr);
		inst.inline = inst.stay_open = false;
		//???this._notifyChange(inst);
		this._updateDatepicker(inst);
	}
	else { this._base_selectDate(id, dateStr); }
};

//#############################################################################################
// second bad hack :/ override datepicker so it triggers an event when changing the input field
// and does not redraw the datepicker on every selectDate event
//#############################################################################################
$.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function(inst) {

	// don't popup the datepicker if there is another instance already opened
	var input = inst.input[0];
	if($.datepicker._curInst &&
	   $.datepicker._curInst != inst &&
	   $.datepicker._datepickerShowing &&
	   $.datepicker._lastInput != input) {
		return;
	}

	if (typeof(inst.stay_open) !== 'boolean' || inst.stay_open === false) {

		this._base_updateDatepicker(inst);

		// Reload the time control when changing something in the input text field.
		var tp_inst = this._get(inst, 'timepicker');
		if(tp_inst) {
			tp_inst._addTimePicker(inst);

			/*if (tp_inst._defaults.useLocalTimezone) { //checks daylight saving with the new date.
				var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 12);
				selectLocalTimeZone(tp_inst, date);
				tp_inst._onTimeChange();
			}*/
		}
	}
};

//#######################################################################################
// third bad hack :/ override datepicker so it allows spaces and colon in the input field
//#######################################################################################
$.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
$.datepicker._doKeyPress = function(event) {
	var inst = $.datepicker._getInst(event.target),
		tp_inst = $.datepicker._get(inst, 'timepicker');

	if (tp_inst) {
		if ($.datepicker._get(inst, 'constrainInput')) {
			var ampm = tp_inst._defaults.ampm,
				dateChars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat')),
				datetimeChars = tp_inst._defaults.timeFormat.toString()
								.replace(/[hms]/g, '')
								.replace(/TT/g, ampm ? 'APM' : '')
								.replace(/Tt/g, ampm ? 'AaPpMm' : '')
								.replace(/tT/g, ampm ? 'AaPpMm' : '')
								.replace(/T/g, ampm ? 'AP' : '')
								.replace(/tt/g, ampm ? 'apm' : '')
								.replace(/t/g, ampm ? 'ap' : '') +
								" " +
								tp_inst._defaults.separator +
								tp_inst._defaults.timeSuffix +
								(tp_inst._defaults.amNames.join('')) +
								(tp_inst._defaults.pmNames.join('')) +
								dateChars,
				chr = String.fromCharCode(event.charCode === undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || (chr < ' ' || !dateChars || datetimeChars.indexOf(chr) > -1);
		}
	}

	return $.datepicker._base_doKeyPress(event);
};

//#######################################################################################
// Override key up event to sync manual input changes.
//#######################################################################################
$.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
$.datepicker._doKeyUp = function (event) {
	var inst = $.datepicker._getInst(event.target),
		tp_inst = $.datepicker._get(inst, 'timepicker');

	if (tp_inst) {
		//this._setTime(inst, tp_date);
		//验证下时分秒是否超出范围
		var datetime = tp_inst.$input.val();
		if(datetime){
			var time = datetime.split(" ")[1].split(":");
			var hour = time[0], minute = time[1], second = time[2], flag = false;
			if(hour < tp_inst._defaults.hourMin || hour > tp_inst._defaults.hourMax){
				tp_inst.$hourInput.val(tp_inst._defaults.hourMax);
				flag = true;
			}else if(minute < tp_inst._defaults.minuteMin || minute > tp_inst._defaults.minuteMax){
				tp_inst.$minuteInput.val(tp_inst._defaults.minuteMax);
				flag = true;
			}else if(second < tp_inst._defaults.secondMin || second > tp_inst._defaults.secondMax){
				tp_inst.$secondInput.val(tp_inst._defaults.secondMax);
				flag = true;
			}
			if(flag)
				tp_inst._onTimeChange();
		}
		
		if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
			try {
				$.datepicker._updateDatepicker(inst);
			}
			catch (err) {
				$.datepicker.log(err);
			}
		}
	}

	return $.datepicker._base_doKeyUp(event);
};

//#######################################################################################
// override "Today" button to also grab the time.
//#######################################################################################
$.datepicker._base_gotoToday = $.datepicker._gotoToday;
$.datepicker._gotoToday = function(id) {
	var inst = this._getInst($(id)[0]),
		$dp = inst.dpDiv;
	this._base_gotoToday(id);
	/*var tp_inst = this._get(inst, 'timepicker');
	selectLocalTimeZone(tp_inst);*/
	var now = new Date();
	this._setTime(inst, now);
	$( '.ui-datepicker-today', $dp).click();
};

//#######################################################################################
// Disable & enable the Time in the datetimepicker
//#######################################################################################
$.datepicker._disableTimepickerDatepicker = function(target) {
	var inst = this._getInst(target);
    if (!inst) { return; }
    
	var tp_inst = this._get(inst, 'timepicker');
	$(target).datepicker('getDate'); // Init selected[Year|Month|Day]
	if (tp_inst) {
		tp_inst._defaults.showTimepicker = false;
		tp_inst._updateDateTime(inst);
	}
};

$.datepicker._enableTimepickerDatepicker = function(target) {
	var inst = this._getInst(target);
    if (!inst) { return; }
    
	var tp_inst = this._get(inst, 'timepicker');
	$(target).datepicker('getDate'); // Init selected[Year|Month|Day]
	if (tp_inst) {
		tp_inst._defaults.showTimepicker = true;
		tp_inst._addTimePicker(inst); // Could be disabled on page load
		tp_inst._updateDateTime(inst);
	}
};

//#######################################################################################
// Create our own set time function
//#######################################################################################
$.datepicker._setTime = function(inst, date) {
	var tp_inst = this._get(inst, 'timepicker');
	if (tp_inst) {
		var defaults = tp_inst._defaults,
			// calling _setTime with no date sets time to defaults
			hour = date ? date.getHours() : defaults.hour,
			minute = date ? date.getMinutes() : defaults.minute,
			second = date ? date.getSeconds() : defaults.second;
		var reset = false;
		if(hour < defaults.hourMin || hour > defaults.hourMax)  
			reset = true;
		else if(minute < defaults.minuteMin || minute > defaults.minuteMax)
			reset = true;
		else if(second < defaults.secondMin || second > defaults.secondMax)
			reset = true;
		if(reset) {
			hour = defaults.hourMin;
			minute = defaults.minuteMin;
			second = defaults.secondMin;
		}
		tp_inst.$hourInput.val(hour);
		tp_inst.$minuteInput.val(minute);
		tp_inst.$secondInput.val(second);

		tp_inst._onTimeChange();
		tp_inst._updateDateTime(inst);
	}
};

//#######################################################################################
// Create new public method to set only time, callable as $().datepicker('setTime', date)
//#######################################################################################
$.datepicker._setTimeDatepicker = function(target, date, withDate) {
	var inst = this._getInst(target);
    if (!inst) { return; }
    
	var tp_inst = this._get(inst, 'timepicker');
    
	if (tp_inst) {
		this._setDateFromField(inst);
		var tp_date;
		if (date) {
			if (typeof date == "string") {
				tp_inst._parseTime(date, withDate);
				tp_date = new Date();
				tp_date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second);
			}
			else { tp_date = new Date(date.getTime()); }
			if (tp_date.toString() == 'Invalid Date') { tp_date = undefined; }
			this._setTime(inst, tp_date);
		}
	}

};

//#######################################################################################
// override setDate() to allow setting time too within Date object
//#######################################################################################
$.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
$.datepicker._setDateDatepicker = function(target, date) {
	var inst = this._getInst(target);
    if (!inst) { return; }
    
	var tp_date = (date instanceof Date) ? new Date(date.getTime()) : date;

	this._updateDatepicker(inst);
	this._base_setDateDatepicker.apply(this, arguments);
	this._setTimeDatepicker(target, tp_date, true);
};

//#######################################################################################
// override getDate() to allow getting time too within Date object
//#######################################################################################
$.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
$.datepicker._getDateDatepicker = function(target, noDefault) {
	var inst = this._getInst(target);
    if (!inst) { return; }
    
    var tp_inst = this._get(inst, 'timepicker');

	if (tp_inst) {
		this._setDateFromField(inst, noDefault);
		var date = this._getDate(inst);
		if (date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly)) { date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second); }
		return date;
	}
	return this._base_getDateDatepicker(target, noDefault);
};

//#######################################################################################
// override parseDate() because UI 1.8.14 throws an error about "Extra characters"
// An option in datapicker to ignore extra format characters would be nicer.
//#######################################################################################
$.datepicker._base_parseDate = $.datepicker.parseDate;
$.datepicker.parseDate = function(format, value, settings) {
    var splitRes = splitDateTime(format, value, settings);
	return $.datepicker._base_parseDate(format, splitRes[0], settings);
};

//#######################################################################################
// override formatDate to set date with time to the input
//#######################################################################################
$.datepicker._base_formatDate = $.datepicker._formatDate;
$.datepicker._formatDate = function(inst, day, month, year){
	var tp_inst = this._get(inst, 'timepicker');
	if(tp_inst) {
		tp_inst._updateDateTime(inst);
		return tp_inst.$input.val();
	}
	return this._base_formatDate(inst);
};

//#######################################################################################
// override options setter to add time to maxDate(Time) and minDate(Time). MaxDate
//#######################################################################################
$.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
$.datepicker._optionDatepicker = function(target, name, value) {
	var inst = this._getInst(target);
    if (!inst) { return null; }
    
	var tp_inst = this._get(inst, 'timepicker');
	if (tp_inst) {
		var min = null, max = null, onselect = null;
		if (typeof name == 'string') { // if min/max was set with the string
			if (name === 'minDate' || name === 'minDateTime' ) {
				min = value;
            }
			else {
                if (name === 'maxDate' || name === 'maxDateTime') {
                    max = value;
                }
                else {
                    if (name === 'onSelect') {
                        onselect = value;
                    }
                }
            }
		} else {
            if (typeof name == 'object') { //if min/max was set with the JSON
                if (name.minDate) {
                    min = name.minDate;
                } else {
                    if (name.minDateTime) {
                        min = name.minDateTime;
                    } else {
                        if (name.maxDate) {
                            max = name.maxDate;
                        } else {
                            if (name.maxDateTime) {
                                max = name.maxDateTime;
                            }
                        }
                    }
                }
            }
        }
		if(min) { //if min was set
			if (min === 0) {
				min = new Date();
            } else {
				min = new Date(min);
            }

			tp_inst._defaults.minDate = min;
			tp_inst._defaults.minDateTime = min;
		} else if (max) { //if max was set
			if(max===0) {
				max=new Date();
            } else {
				max= new Date(max);
            }
			tp_inst._defaults.maxDate = max;
			tp_inst._defaults.maxDateTime = max;
		} else if (onselect) {
			tp_inst._defaults.onSelect = onselect;
        }
	}
	if (value === undefined) {
		return this._base_optionDatepicker(target, name);
    }
	return this._base_optionDatepicker(target, name, value);
};

//#######################################################################################
// jQuery extend now ignores nulls!
//#######################################################################################
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] === null || props[name] === undefined) {
			target[name] = props[name];
        }
    }
	return target;
}
function timeLimitInput(event){
	var code = event.keyCode;
	if((code >= 96 && code <= 105) || (code >= 48 && code <= 57) || code == 8 || code == 9){
		return true;
	}else{
		return false;
	};
}
//#######################################################################################
// Splits datetime string into date ans time substrings.
// Throws exception when date can't be parsed
// If only date is present, time substring eill be '' 
//#######################################################################################
var splitDateTime = function(dateFormat, dateTimeString, dateSettings)
{
	try {
		$.datepicker._base_parseDate(dateFormat, dateTimeString, dateSettings);
	} catch (err) {
		if (err.indexOf(":") >= 0) {
			// Hack!  The error message ends with a colon, a space, and
			// the "extra" characters.  We rely on that instead of
			// attempting to perfectly reproduce the parsing algorithm.
            var dateStringLength = dateTimeString.length-(err.length-err.indexOf(':')-2);
            //var timeString = dateTimeString.substring(dateStringLength);

            return [dateTimeString.substring(0, dateStringLength), dateTimeString.substring(dateStringLength)];
            
		} else {
			throw err;
		}
	}
	return [dateTimeString, ''];
};

//#######################################################################################
// Internal function to parse datetime interval
// Returns: {date: Date, timeObj: Object}, where
//   date - parsed date without time (type Date)
//   timeObj = {hour: , minute: , second: , millisec: } - parsed time. Optional
//#######################################################################################
var parseDateTimeInternal = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings)
{
    var date;
    var splitRes = splitDateTime(dateFormat, dateTimeString, dateSettings);
	date = $.datepicker._base_parseDate(dateFormat, splitRes[0], dateSettings);
    if (splitRes[1] !== '')
    {
        var timeString = splitRes[1];
        var separator = timeSettings && timeSettings.separator ? timeSettings.separator : $.timepicker._defaults.separator;            
        if ( timeString.indexOf(separator) !== 0) {
            throw 'Missing time separator';
        }
        timeString = timeString.substring(separator.length);
        var parsedTime = $.datepicker.parseTime(timeFormat, timeString, timeSettings);
        if (parsedTime === null) {
            throw 'Wrong time format';
        }
        return {date: date, timeObj: parsedTime};
    } else {
        return {date: date};
    }
};

$.timepicker = new Timepicker(); // singleton instance
$.timepicker.version = "1.0.1";

})(jQuery);