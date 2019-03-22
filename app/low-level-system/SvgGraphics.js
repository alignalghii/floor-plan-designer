/*******************************
 * Drawing figure, map it to SVG:
 *******************************/


function SvgGraphics(svgSize, coordsysTransfScale)   // Set/unset always simultaneosly: svg <-> svgPoint <-> ...
{
	this.svgSize     = svgSize;
	this.domainToSvg = domainToSvgFactory(svgSize, coordsysTransfScale);
	this.svgToDomain = svgToDomainFactory(svgSize, coordsysTransfScale);

	this.graphicsHeader = document.getElementById('graphics_header');

	var [svgWidth, svgHeight] = this.svgSize;
	this.svg         = createElementWithAttributes('svg'   , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
	this.svgPoint    = this.svg.createSVGPoint();
	this.board       = emptyBoard;
	this.standingFig = new Figure([0, 0], [[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red' });
	this.movingFig   = new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'});
	this.id_standing = this.board.addFigure(this.standingFig); // @TODO procedural
	this.id_moving   = this.board.addFigure(this.movingFig  ); // @TODO procedural
}


SvgGraphics.prototype.unrender = function () {
	deleteElementsWithTagName('svg');
};

SvgGraphics.prototype.render = function () {
	this.graphicsHeader.innerHTML = 'SVG graphics';
	document.body.appendChild(this.svg);

	redrawFigure(this.id_standing, this.board, this.domainToSvg, this.svg);
	redrawFigure(this.id_moving  , this.board, this.domainToSvg, this.svg);
	//svg.setAttributeNS(xmlns, 'xmlns'      , svgNS);
	//svg.setAttributeNS(xmlns, 'xmlns:xlink', xlink);
};

SvgGraphics.prototype.assimilateEventPosition = function (event) {
	this.svgPoint.x = event.clientX;
	this.svgPoint.y = event.clientY;
	var showPoint        = this.svgPoint.matrixTransform(this.svg.getScreenCTM().inverse());
	var eventDomainPoint = this.svgToDomain([showPoint.x, showPoint.y]);
	var displacement     = fromTo(this.movingFig.grasp, eventDomainPoint);
	var futureFig = this.movingFig.translation(displacement);
	var collision = futureFig.collides(this.standingFig);
	if (!collision) {
		this.movingFig.doTranslation(displacement);                                     // @TODO procedural
		this.board.updateFigure(this.id_moving, this.movingFig);                        // @TODO procedural
		redrawFigure(this.id_moving, this.board, this.domainToSvg, this.svg);
	}
};
