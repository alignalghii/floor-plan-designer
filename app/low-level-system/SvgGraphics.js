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
	this.svgLowLevel = new SvgLowLevel(svgWidth, svgHeight);
	this.board       = new Board(); // initially empty, with next_id:'fig_1', features:{}, focus_id: null
	this.board.appendLoadFrom(figureBank);
}


SvgGraphics.prototype.unrender = function () {
	deleteElementsWithTagName('svg');
};

SvgGraphics.prototype.render = function () {
	this.graphicsHeader.innerHTML = 'SVG graphics';
	this.svgLowLevel.mount();
	this.redrawFigures();
};

SvgGraphics.prototype.assimilateEventPositionOnFocusIfAny = function (event) {
	if (this.board.focus_id) {
		var figure       = this.getFocusFigure();
		var displacement = this.inferDisplacement(event, figure);

		if (!this.wouldCollide(figure, displacement)) {
			this.translateFocus(displacement);
		} else {
			this.focusOff();
		}
	}
};

SvgGraphics.prototype.focusToggle = function (event)
{
	if (this.board.focus_id) {
		this.focusOff();
	} else {
		this.focusOn(event.target.id);
		var eventDomainPoint = this.eventDomainPosition(event);
		this.getFocusFigure().grasp = eventDomainPoint;
	}
};

SvgGraphics.prototype.inferDisplacement = function (event, figure)
{
	var eventDomainPoint = this.eventDomainPosition(event);
	return fromTo(figure.grasp, eventDomainPoint);
};

SvgGraphics.prototype.eventDomainPosition = function (event)
{
	var eventSvgPosition = this.svgLowLevel.eventPosition(event)
	return this.svgToDomain(eventSvgPosition);
};

SvgGraphics.prototype.wouldCollide = function (figure, displacement)
{
	var futureFig = figure.translation(displacement);
	return this.board.collidesAny(futureFig);
};

SvgGraphics.prototype.translateFocus = function (displacement)
{
	this.getFocusFigure().doTranslation(displacement); // @TODO procedural. Note that `this.board.updateFigure(this.focus_id, fig)` is unnecessary after this!
	this.redrawFocus();
};

SvgGraphics.prototype.getFocusFigure = function () {return this.board.figures[this.board.focus_id];};

SvgGraphics.prototype.redrawFocus = function () {this.redrawFigure(this.board.focus_id);};

SvgGraphics.prototype.redrawFigures = function()
{
	var that = this; function redrawIt(id, figure) {that.redrawFigure(id, figure);}
	this.board.loopOverFigures(redrawIt);
};

SvgGraphics.prototype.redrawFigure = function (id, figure = null)
{
	figure            = figure || this.board.figures[id];
	var svgVertices   = figure.vertices.map(this.domainToSvg);
	var svgProperties = figure.getSvgProperties();
	this.svgLowLevel.makeOrUpdateFigureElement(id, svgVertices, svgProperties);
};

SvgGraphics.prototype.focusOn = function (id)
{
	this.board.focus_id = id;
	this.svgLowLevel.style(id, 'opacity', 0.5);
	//console.log('+' + id);
};

SvgGraphics.prototype.focusOff = function ()
{
	if (this.board.focus_id) {
		//console.log('-' + this.board.focus_id);
		this.svgLowLevel.style(this.board.focus_id, 'opacity', null);
		this.board.focus_id = null;
	} else {
		//console.log('-');
	}
};
