
/*******************************
 * Query the Board: Abstract modeling of events, and enabling acting both on abstract representation with concrete SVG level
 *******************************/

function selectByProp(property, figures)
{
	var keys = [];
	for (key in figures) {
		if (property(figures[key])) {
			keys.push(key);
		}
	}
	return keys;
}

function selectByMax(scorer, figures)
{
	var keys = [];
	var maxVal, virgin = true;
	for (key in figures) {
		var val = scorer(figures[key]);
		if (virgin || val > maxVal) {
			maxVal = val;
			keys   = [key];
		} else if (!virgin && val == maxVal) {
			keys.push(key);
		}
		virgin = false;
	}
	return keys;
}




/*******************************
 * Drawing figure:
 *******************************/

function redrawFigure(id, board, domainToSvg, svgElement)
{
	var figureElement = document.getElementById(id);
	if (!figureElement) {
		figureElement = document.createElementNS(svgNS, 'polygon');
		figureElement.id = id;
		svgElement.appendChild(figureElement);
	}
	var figure = board.figures[id];
	var points   = drawFigureAux(domainToSvg, figure.vertices);
	figureElement.setAttribute('points', points);
	for (var key in figure) {
		if (key != 'vertices') figureElement.setAttribute(key, figure[key]);
	}
}

function drawFigureAux(domainToSvg, vertices) {return vertices.map(domainToSvg).map(stringifyPositionWithComma).join(' ');}

/**
 * We need this function:
 * Although `Array.prototype.join.call([12,7])` --> `"12,7"`, but `Array.prototype.join.call` is not a callback, cannot go higher.order!
 */
function stringifyPositionWithComma([x, y]) {return '' + x + ',' + y + '';}




/******************************
 * Transition between coordinate sytems:
 ******************************/

function domainToSvgFactory(svgSize, scale)
{
	function domainToSvg(domainPosition)
	{
		var [ w,  h] = svgSize;    // width, height (w and h is used, not to clash with windows.width and windows.height)
		var [sw, sh] = [w/2, h/2]; // semiwidth, semiheight
		var [ x,  y] = domainPosition;
		return [sw+scale*x, sh-scale*y];
	}
	return domainToSvg;
}

function svgToDomainFactory(svgSize, scale)
{
	function svgToDomain(svgPosition)
	{
		var [ w,  h] = svgSize;
		var [Ox, Oy] = [w/2, h/2];
		var [ x,  y] = svgPosition;
		var [dx, dy] = [x-Ox, Oy-y];
		return [dx/scale, dy/scale];
	}
	return svgToDomain;
}
