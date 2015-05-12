$.fn.pager = function(options) {

	var settings = {
		formId : 'formQuery',
		recordSize : 0,
		currentPage : 0,
		recordPage : 10,
		buttonClass : '',
		navId : 'nav',
		navClass : 'nav',
		navAttach : 'append',
		highlightClass : 'highlight',
		height : null
	};
	
	if (options)
		$.extend(settings, options);

	return this.each(function() {

				var tdPager = $(this);

				function init() {
					var pagerHtml = '';
					if (settings.recordSize > 0) {

						var pageSize = (settings.recordSize - 1)
								/ settings.recordPage;
						pageSize = parseInt(pageSize) + 1;

						if($('#' + settings.formId).find('#currentPage').length<1){
							pagerHtml += '<input type="hidden" name="currentPage" id="currentPage" ';
							pagerHtml += ' value="'+settings.currentPage+'"';
							pagerHtml += ' />';
						}

						pagerHtml += '共 ' + settings.recordSize + ' 条记录';

						pagerHtml += '&nbsp;&nbsp;第(' + settings.currentPage + '/' + pageSize + ') 页';

						if (settings.currentPage < 2) {
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" title1="已经是第一页">首页</a>';
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" title1="已经是第一页">上一页</a>';
						} else {
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" rel="1">首页</a>';
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" rel="' + (parseInt(settings.currentPage) - 1) + '">上一页</a>';
						}

						if (settings.currentPage >= pageSize) {
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" title1="已经是最后页">下一页</a>';
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" title1="已经是最后页">尾页</a>';
						} else {
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" rel="' + (parseInt(settings.currentPage) + 1) + '">下一页</a>';
							pagerHtml += '&nbsp;&nbsp;<a href="javascript:void(0);" rel="' + pageSize + '">尾页</a>';
						}
						pagerHtml += '&nbsp;&nbsp;第<input type="text" id="_recordSize" size="1" />页</a>';
						pagerHtml += '&nbsp;&nbsp;<input type="button" value="GO" id="btnPager" class="' + settings.buttonClass + '" />';

						tdPager.append(pagerHtml);
						setAnchorClick(pageSize);
					}else{
						pagerHtml = '没有找到任何记录!';
						tdPager.append(pagerHtml);
					}
				}

				/**
				 * 设置 翻页 事件
				 */
				function setAnchorClick(pageSize) {
					
					//设置链接事件
					$(tdPager).find('a').click(function() {
						if ($(this).attr('rel')) {
							_submitForm($(this).attr('rel'));
						} else {
							//showMessage($(this).attr('title1')+'！');
						}
					});

					//设置按钮跳转到指定页
					$(tdPager).find('#btnPager').click(function() {
						var pageNo = $('#_recordSize').val();
						if (pageNo.length < 1 || isNaN(pageNo)) {
							showMessage('请输入页码【必须是数字】！');
						} else {
							try {
								var i = parseInt(pageNo);
								if (i) {
									if (i > pageSize || i < 1) {
										showMessage('页码范围为【1-' + pageSize + '】！');
									} else {
										_submitForm(pageNo);
									}
								} else {
									showMessage('请输入页码【必须是数字】！');
								}
							} catch (e) {
								showMessage(e.message);
							}
						}
						$('#_recordSize').focus();
						$('#_recordSize').select();
					});
				}

				/**
				 * 提交表单
				 */
				function _submitForm(pageNo) {
					//showBlock("<br/>&nbsp;&nbsp;&nbsp;页面正在加载中，请稍候.......");
					$('#currentPage').val(pageNo);
					$('#' + settings.formId)[0].submit();
				}

				init();
			});
};
