/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.enterMode=CKEDITOR.ENTER_BR,//不会自动生成<p>
	config.height="80px",
	config.extraPlugins = 'uicolor',
	config.removePlugins='elementspath',
	config.resize_enabled=false,
	config.uiColor= "#F7F7F7",
	config.filebrowserUploadUrl = 'ckeditor/uploader?Type=File',
	config.filebrowserImageUploadUrl = 'ckeditor/uploader?Type=Image',
	config.filebrowserFlashUploadUrl = 'ckeditor/uploader?Type=Flash',
	
	config.toolbar=
	[
		//[ 'Source', 'Maximize' , 'NewPage' , 'Preview' ], 
		[ 'Source', 'Maximize' , 'NewPage' ], 
		//[ 'Undo' , 'Redo' , '-'  , 'SelectAll' , 'RemoveFormat' ],
		[ 'Undo' , 'Redo' , '-'  , 'RemoveFormat' ],
		[ 'Bold' , 'Italic' , 'Underline' , 'Strike' ],
		[ 'Link' , 'Unlink' ],
		[ 'Image' , 'Table' , 'SpecialChar' ],
		[ 'TextColor' , 'BGColor' ]
	];
};
