/*******************************
 * Drawing figure, map it to SVG:
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

/*******************************
 * Canvas: @TODO dependency injection for `inside`
 *******************************/

function graphics(ctx, x0, y0, x1, y1, figure, step, o1, o2, fillStyle)
{
	ctx.fillStyle = fillStyle;
	for (var x = x0; x <= x1; x+=1/step) {
		for (var y = y0; y <= y1; y+=1/step) {
			var pixel = inside([x, y], figure);
			if (pixel) ctx.fillRect(o1+step*x, o2-step*y, 1, 1);
		}
	}
}
