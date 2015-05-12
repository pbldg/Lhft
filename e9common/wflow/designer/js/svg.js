var xmlns = parent.xmlns;
var SVGDocument = null;
var SVGRoot = null;
var TrueCoords = null;
var GrabPoint = null;
var DragTarget = null; 


function g_init(evt) {
	//document.onselectstart = function() { return false; };
	SVGDocument = evt.target.ownerDocument;
	SVGRoot = SVGDocument.documentElement;
	TrueCoords = SVGRoot.createSVGPoint();
	GrabPoint = SVGRoot.createSVGPoint();
	parent.setInit(SVGDocument);
}