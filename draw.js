function drawFigureAux(domainToSvg, figure) {return figure.map(domainToSvg).map(stringifyPositionWithComma).join(' ');}

/**
 * We need this function:
 * Although `Array.prototype.join.call([12,7])` --> `"12,7"`, but `Array.prototype.join.call` is not a callback, cannot go higher.order!
 */
function stringifyPositionWithComma([x, y]) {return '' + x + ',' + y + '';}

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
