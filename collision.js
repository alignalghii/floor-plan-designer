function inside(point, figure)
{
	var flag_leftHand = flag_rightHand = true;
	tour(figure).forEach(function ([point1, point2]) {flag_leftHand  = flag_leftHand  && sectionSide(point1, point2, point) >= 0;});
	tour(figure).forEach(function ([point1, point2]) {flag_rightHand = flag_rightHand && sectionSide(point1, point2, point) <= 0;});
	return flag_leftHand || flag_rightHand;
}

function tour(xs)
{
	if (xs.length == 0) {
		return [];
	} else {
		var ret   = [];
		var x0 = first = xs[0];
		xs.forEach (function (x, key) {if (key > 0) ret.push([x0, x]); x0 = x});
		ret.push([x0, first]);
		return ret;
	}
}

function vecEq(u, v) {return isPrefixOf(u, v) && isPrefixOf(v, u);}

function eq(a, b)
{
	if (typeof a == "object" && typeof b =="object") {
		return vecEq(a, b);
	} else {
		return a == b;
	} 
}

function isPrefixOf(as, bs)
{
	var ret = true;
	as.forEach(function (val, key) {ret = ret && key in bs && eq(bs[key], val);});
	return ret;
}

function sectionSide(point1, point2, testPoint)
{
	var lineVector = fromTo(point1, point2);
	return lineSide(point1, lineVector, testPoint);
}

function lineSide(linePoint,lineVector, testPoint)
{
	return det(lineVector, fromTo(linePoint, testPoint));
}

function minus(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return [a1-b1, a2-b2];
}

function fromTo(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return [b1-a1, b2-a2];
}

function det(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return a1*b2 - a2*b1;
}

function same(stats)
{
	return lAnd(stats) || !lOr(stats);
}

function lAnd(stats)
{
	var status = true;
	stats.forEach(function (stat) {status = status && stat;})
	return status;
}

function lOr(stats)
{
	var status = false;
	stats.forEach(function (stat) {status = status || stat;})
	return status;
}
