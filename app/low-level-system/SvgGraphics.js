/*******************************
 * Drawing figure, map it to SVG:
 *******************************/

/*
const poly1_convex_ccw = [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]];
const poly1_convex_cw  = [[2, 1], [1, 6], [5, 7], [7, 5], [6, 2]];

const poly1_concave_ccw = [[ 4, -1], [ 7,  2], [ 5,  2], [ 4,  4], [ 5,  7], [ 3,  9], [ 3,  3], [-3,  5], [-3,  2], [-1,  1], [-2,  -2]];
const poly1_concave_cw  = [[ 4, -1], [-2, -2], [-1,  1], [-3,  2], [-3,  5], [ 3,  3], [ 3,  9], [ 5,  7], [ 4,  4], [ 5,  2], [ 7,  2]];

const poly2_convex_ccw  = [[ 0, -2], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_convex_cw   = [[ 0, -2], [-2, -1], [ 0,  1], [ 2, -1]];
const poly2_degen_ccw   = [[ 0, -1], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_degen_cw    = [[ 0, -1], [-2, -1], [ 0,  1], [ 2, -1]];
const poly2_concave_ccw = [[ 0,  0], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_concave_cw  = [[ 0,  0], [-2, -1], [ 0,  1], [ 2, -1]];

*/

const figureBank = [
	(new Figure([0, 0], [[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red' })).translation([-6,5]),
	(new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'})).translation([-8,-4,]),
	(new Figure([0, 0], poly1_convex_ccw, {fill: 'magenta'})).translation([-18,0]),
	(new Figure([0, 0], poly1_concave_ccw, {fill: 'green'})).translation([8,-7]),
	(new Figure([0, 0], poly2_convex_ccw, {fill: 'black'})).translation([0,-4]),
	(new Figure([0, 0], poly2_degen_ccw, {fill: 'gray'})).translation([-2.3,-0.7]),
	(new Figure([0, 0], poly2_concave_ccw, {fill: 'orange'})).translation([-4,2.6])
];

function SvgGraphics(svgSize, coordsysTransfScale)   // Set/unset always simultaneosly: svg <-> svgPoint <-> ...
{
	this.svgSize     = svgSize;
	this.domainToSvg = domainToSvgFactory(svgSize, coordsysTransfScale);
	this.svgToDomain = svgToDomainFactory(svgSize, coordsysTransfScale);

	this.graphicsHeader = document.getElementById('graphics_header');

	var [svgWidth, svgHeight] = this.svgSize;
	this.svg         = createElementWithAttributes('svg'   , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
	this.svgPoint    = this.svg.createSVGPoint();
	this.board       = new Board(); // initially empty, with next_id:'fig_1', features:{}, focus_id: null

	for (var i = 0; i < figureBank.length; i++) {
		this.board.addFigure(figureBank[i]); // @TODO procedural
	}
	//this.board.addFigure(redTriangle); // @TODO procedural
	//this.board.addFigure(blueSquare  ); // @TODO procedural
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
	var collision = false;
	for (var key in this.board.figures) {
		if (this.board.figures.hasOwnProperty(key) && key != this.board.focus_id) {
			if (this.board.figures[key].collides(futureFig)) collision = true;
		}
	}
	//var collision = futureFig.collides(this.standingFig);
	if (!collision) {
		fig.doTranslation(displacement);                                     // @TODO procedural
		//this.board.updateFigure(this.focus_id, fig);                        // @TODO procedural
		redrawFigure(this.board.focus_id, this.board, this.domainToSvg, this.svg);
	} else {
		document.getElementById(this.board.focus_id).style.opacity = null;
		this.board.focus_id = null;
	}
};
