function fromTo(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return [b1-a1, b2-a2];
}

function scalarProduct ([a, b], [c, d]) {return a*c + b*d;}
function vectorLength  ([a, b]        ) {return Math.sqrt(a*a + b*b);}

function signedRotAngleOfVectors(u , v)
{
	var measure = angleOfVectors(u, v);
	var dir = det(u, v);
	return (dir >= 0 ? 1 : -1) * measure;
}

function angleOfVectors(u , v)
{
	var val = scalarProduct(u, v) / (vectorLength(u) * vectorLength(v));
	if (val >  1) val =  1;
	if (val < -1) val = -1;
	return Math.acos(val) * 180 / Math.PI;
}

function det(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return a1*b2 - a2*b1;
}

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
