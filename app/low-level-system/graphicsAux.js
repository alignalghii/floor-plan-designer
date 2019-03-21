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
