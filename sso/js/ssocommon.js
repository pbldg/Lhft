/**
 * 弹出用户选择框 
 * @param selectUserId 已经选中的用户ID
 * @param userCodeInput code输入框ID 
 * @param userNameInput name输入框ID
 * @param popSource 弹出源POP:弹出窗口，TAB:tab页
 * @param maxSelectedUser 最多可以选择的人数
 */
function popUser(selectUserId, userCodeInput, userNameInput, popSource, maxSelectedUser, callBack){
	var url = "HttpChannel?action=COMMON_ACTION&BUSINESS_TYPE=sso.user&BIZMETHODNAME=popUser";
	url += "&SELECTED_USER_ID="+selectUserId;
	url += "&USER_CODE_INPUT="+userCodeInput;
	url += "&USER_NAME_INPUT="+userNameInput;
	url += "&POP_SOURCE="+popSource;//弹出源：POP:弹出窗口，TAB:tab窗口
	url += "&MAX_SELECTED_USER="+maxSelectedUser;//是否只能选择一个学校
	
	if(callBack){
		url += "&CALLBACK="+callBack;//回调
	}
	$.uiPopWindow(
			'userDialog',
			url,
			{
				closeOnEscape: true,
				title: "用户选择窗口", 
				width: 600, 
				height: 450, 
				draggable: true
			});
}
