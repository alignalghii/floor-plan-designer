/*******************************
 * Drawing figure, map it to SVG:
 *******************************/


function SvgSingletonGlobals(svgSize, coordsysTransfScale)
{
	this.svgSize     = svgSize;
	this.domainToSvg = domainToSvgFactory(svgSize, coordsysTransfScale);
	this.svgToDomain = svgToDomainFactory(svgSize, coordsysTransfScale);

	this.graphicsHeader = document.getElementById('graphics_header');

	this.renull();
}

SvgSingletonGlobals.prototype.renull = function () {
	this.svg = this.svgPoint = this.board = this.standingFig = this.movingFig = this.id_standing = this.id_moving = null;    // set/unset always simultaneosly
},


SvgSingletonGlobals.prototype.renullAlsoVisually = function () {
	deleteElementsWithTagName('svg');
	this.renull();
},

SvgSingletonGlobals.prototype.reload = function () {
	this.graphicsHeader.innerHTML = 'SVG graphics';
	var [svgWidth, svgHeight] = this.svgSize;
	this.svg         = createAndAppendChildWithAttrs(document.body, 'svg'   , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);   // set/unset always simultaneosly
	this.svgPoint    = this.svg.createSVGPoint();                                                                            // set/unset always simultaneosly
	this.board       = emptyBoard;                                                                                           // set/unset always simultaneosly
	this.standingFig = new Figure([0, 0], [[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red' });                         // set/unset always simultaneosly
	this.movingFig   = new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'});                         // set/unset always simultaneosly
	this.id_standing = this.board.addFigure(this.standingFig); // @TODO procedural
	this.id_moving   = this.board.addFigure(this.movingFig  ); // @TODO procedural

	redrawFigure(this.id_standing, this.board, this.domainToSvg, this.svg);
	redrawFigure(this.id_moving  , this.board, this.domainToSvg, this.svg);
	//svg.setAttributeNS(xmlns, 'xmlns'      , svgNS);
	//svg.setAttributeNS(xmlns, 'xmlns:xlink', xlink);
},

SvgSingletonGlobals.prototype.assimilateEventPosition = function (event) {
	if (this.hasBeenSet()) {
		this.svgPoint.x = event.clientX;
		this.svgPoint.y = event.clientY;
		var showPoint        = this.svgPoint.matrixTransform(this.svg.getScreenCTM().inverse());
		var clickDomainPoint = this.svgToDomain([showPoint.x, showPoint.y]);
		var displacement     = fromTo(this.movingFig.grasp, clickDomainPoint);
		this.movingFig.doTranslation(displacement);                                     // @TODO procedural
		this.board.updateFigure(this.id_moving, this.movingFig);                        // @TODO procedural
		redrawFigure(this.id_moving, this.board, this.domainToSvg, this.svg);
	}
},

SvgSingletonGlobals.prototype.hasBeenSet = function () {
	return this.svg && this.svgPoint;  // svg <-> svgPoint <-> ...
}
