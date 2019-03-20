/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function translation([dx, dy], figureIn)
{
	function displace([x,y]) {return [x+dx, y+dy];}  // @TODO curry(pointwise(bPlus))(displacement)

	var figureOut = {}, value;
	for (var key in figureIn) {
		switch (key) {
			case 'grasp':
				var [x0, y0] = figureIn.grasp;
				value = [x0+dx, y0+dy];
				break;
			case 'vertices':
				value = figureIn.vertices.map(displace);
				break;
			default:
				value = figureIn[key];
		}
		figureOut[key] = value;
	}
	return figureOut;
}

function doTranslation([dx, dy], figure)
{
	function displace(point) {point[0] = point[0]+dx; point[1] = point[1] + dy;}
	figure.vertices.forEach(displace);
	figure.grasp[0] += dx;
	figure.grasp[1] += dy;
}

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

const emptyBoard = {next_id: 'fig_1', figures: {}};

/*@TODO procedural*/
function addFigure(figure, board)
{
	var id  = board.next_id;
	var n  = figureNum(id);
	board.figures[id] = figure;
	board.next_id = figureId(n+1);
	return id;
}

/*@TODO procedural*/
function deleteFigure(id, board) {delete board.figures[id];}

/*@TODO procedural*/
function updateFigure(id, figure, board){board.figures[id] = figure;}


function figureNum(id) {return parseInt(/.*_(.*)/.exec(id)[1]);}
function figureId (n ) {return 'fig_' + n;}



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
