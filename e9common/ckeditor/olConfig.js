/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.enterMode=CKEDITOR.ENTER_BR,//不会自动生成<p>
	config.height="175px",
	config.width="650px",
	config.extraPlugins = 'uicolor',
	config.removePlugins='elementspath',
	config.resize_enabled=false,
	config.uiColor= "#F7F7F7",
	config.filebrowserUploadUrl = 'ckeditor/uploader?Type=File',
	config.filebrowserImageUploadUrl = 'ckeditor/uploader?Type=Image',
	config.filebrowserFlashUploadUrl = 'ckeditor/uploader?Type=Flash',
	config.toolbar=
	[
		[  'Source' ,'Maximize' , 'NewPage' , 'Preview' ], //'Source' , '-' , 'Save' ,
		//[ 'Cut' , 'Copy' , 'Paste' , 'PasteText' , 'PasteFromWord' , '-' , 'Print' , 'SpellChecker' , 'Scayt' ],
		[ 'Undo' , 'Redo' , '-' , 'Find' , 'Replace' , '-' , 'SelectAll' , 'RemoveFormat' ],
		//[ 'Form' , 'Checkbox' , 'Radio' , 'TextField' , 'Textarea' , 'Select' , 'Button' , 'ImageButton' , 'HiddenField' ],
		[ 'Bold' , 'Italic' , 'Underline' , 'Strike' ],//, '-' , 'Subscript' , 'Superscript' 
		//[ 'NumberedList' , 'BulletedList' , '-' , 'Outdent' , 'Indent' , 'Blockquote' ],
		[ 'JustifyLeft' , 'JustifyCenter' , 'JustifyRight' , 'JustifyBlock' ],
		[ 'Link' , 'Unlink' ],
		[ 'Image' , 'Flash' , 'Table' , 'HorizontalRule' , 'Smiley' , 'SpecialChar' , 'PageBreak' ],
		['Styles','Format','Font','FontSize'],
		['TextColor','BGColor']
	];
};
