/*******************************
 * Drawing figure, map it to SVG:
 *******************************/

function SvgGraphics(svgSize, coordsysTransfScale, figureBank = [])   // Set/unset always simultaneosly: svg <-> svgPoint <-> ...
{
	this.svgSize     = svgSize;
	this.domainToSvg = domainToSvgFactory(svgSize, coordsysTransfScale);
	this.svgToDomain = svgToDomainFactory(svgSize, coordsysTransfScale);

	this.graphicsHeader = document.getElementById('graphics_header');

	var [svgWidth, svgHeight] = this.svgSize;
	this.svg         = createElementWithAttributes('svg'   , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
	this.svgPoint    = this.svg.createSVGPoint();
	this.board       = new Board(); // initially empty, with next_id:'fig_1', features:{}, focus_id: null
	this.board.appendLoadFrom(figureBank);
}


SvgGraphics.prototype.unrender = function () {
	deleteElementsWithTagName('svg');
};

SvgGraphics.prototype.render = function () {
	this.graphicsHeader.innerHTML = 'SVG graphics';
	document.body.appendChild(this.svg);

	for (var key in this.board.figures) {
		if (this.board.figures.hasOwnProperty(key)) {
			redrawFigure(key, this.board, this.domainToSvg, this.svg);
		}
	}
	//svg.setAttributeNS(xmlns, 'xmlns'      , svgNS);
	//svg.setAttributeNS(xmlns, 'xmlns:xlink', xlink);
};

SvgGraphics.prototype.assimilateEventPosition = function (event) {
	var fig = this.board.figures[this.board.focus_id];
	this.svgPoint.x = event.clientX;
	this.svgPoint.y = event.clientY;
	var showPoint        = this.svgPoint.matrixTransform(this.svg.getScreenCTM().inverse());
	var eventDomainPoint = this.svgToDomain([showPoint.x, showPoint.y]);
	//console.log(eventDomainPoint[0] + ' ' + eventDomainPoint[1]);
	var displacement     = fromTo(fig.grasp, eventDomainPoint);
	var futureFig = fig.translation(displacement);
	var collision = this.board.collidesAny(futureFig);
	if (!collision) {
		fig.doTranslation(displacement);                                     // @TODO procedural
		//this.board.updateFigure(this.focus_id, fig);                        // @TODO procedural
		redrawFigure(this.board.focus_id, this.board, this.domainToSvg, this.svg);
	} else {
		document.getElementById(this.board.focus_id).style.opacity = null;
		this.board.focus_id = null;
	}
};
