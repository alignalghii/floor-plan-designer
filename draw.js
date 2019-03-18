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
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function addFigure(figure, board)
{
	var id  = board.next_id;
	var n  = figureNum(id);
	board.figures[id] = figure;
	board.next_id = figureId(n+1);
	return [id, board];
}

function deleteFigure(id, board)
{
	delete board.figures[id];
	return board;
}

function updateFigure(id, figure, board)
{
	board.figures[id] = figure;
	return board;
}


function figureNum(id) {return parseInt(/.*_(.*)/.exec(id)[1]);}
function figureId (n ) {return 'fig_' + n;}



/*******************************
 * Drawing figure:
 *******************************/

function drawFigureAux(domainToSvg, figure) {return figure.map(domainToSvg).map(stringifyPositionWithComma).join(' ');}

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
