
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


function asciiGraphics(x0, y0, x1, y1, figure, step = 1, on = '#', off = '.')
{
	var graph = '';
	for (var y = y1; y >= y0; y -=step) {
		for (var x = x0; x <= x1; x+=step) {
			var pixel = inside([x, y], figure) ? on : off;
			graph += pixel;
		}
		graph += "\n";
	}
	return graph;
}

function inside(point, figure)
{
	var edges = tour(figure);
	var dir   = signedRotAngleSumWhenToured(figure);
	if (dir > 0) {
		function pointIsLeftOfEdge ([edgeStart, edgeEnd]) {return sectionSide(edgeStart, edgeEnd, point) >= 0;}
		var expr_lhs = subsequencerRolled(edges, areConvexDirectedEdges  );
		var flag_lhs = angleTyper(expr_lhs , pointIsLeftOfEdge, true, bAnd, bOr);
		return flag_lhs;
	}
	if (dir < 0) {
		function pointIsRightOfEdge([edgeStart, edgeEnd]) {return sectionSide(edgeStart, edgeEnd, point) <= 0;}
		var expr_rhs = subsequencerRolled(edges, areConcave0DirectedEdges);
		var flag_rhs = angleTyper(expr_rhs, pointIsRightOfEdge, true, bAnd, bOr);
		return flag_rhs;
	}
	// @TODO var flag = flag_lhs && !flag_rhs;
}

function signedRotAngleSumWhenToured(figure)
{
	var edges      = tour(figure);
	var geomAngles = tour(edges);
	var measAngles = geomAngles.map(uncurry(signedRotAngleOfEdges));
	return sum(measAngles);
}

function angleSumWhenToured(figure)
{
	var edges      = tour(figure);
	var geomAngles = tour(edges);
	var measAngles = geomAngles.map(uncurry(angleOfEdges));
	return sum(measAngles);
}

function angleTyper(expr, edgeProperty, constForEmpty, opForConvexMappeds, opForConcaveMappeds)
{
	function andProperty (conjunction, edge) {return opForConvexMappeds (conjunction, edgeProperty(edge));}
	function  orProperty (disjunction, edge) {return opForConcaveMappeds(disjunction, edgeProperty(edge));}
	function  orProperty1(disjunction, edge) {return disjunction === null ? edgeProperty(edge) : orProperty(disjunction, edge);}
	return executeTree(andProperty, constForEmpty, orProperty1, null, opForConvexMappeds, expr);
}


function executeTree(op_extern, const_extern, op_intern, const_intern, op_splice, exprTree)
{
	var result = const_extern;
	for (var i = 0; i < exprTree.length; i++) {
		var item = exprTree[i];
		if ('sub' in item) {
			subresult = item.sub.reduce(op_intern, const_intern); // foldl(op_intern, const_intern, item.sub);
			result = op_splice(result, subresult);
		} else {
			result = op_extern(result, item.val);
		}
	}
	return result;
}

function uncurry(f) {return function ([a, b]) {return f(a, b);};}

function foldl(op, cnst, lst) // @TODO same as `Array.prototype.reduce`?
{
	var result = cnst;
	lst.forEach(function (item) {result = op(result, item);});
	return result;
}

function depth(xs)
{
	if (typeof xs == 'object') {
		var maxDepth = 0;
		xs.forEach(function (item) {var currentDepth = depth(item); if (currentDepth > maxDepth) maxDepth = currentDepth;});
		return maxDepth + 1;
	} else {
		return 0;
	}
}

function subsequencerRolled(xs, f)
{
	xsR = rollToJoin(xs, f);
	return subsequencer(xsR, f);
}

function subsequencer(xs, f)
{
	var expr = [];
	for (var i = 0; i < xs.length; i++) {
		var x = xs[i];
		var lastValue;
		if (expr.length) {
			var lastPart = expr.pop();
			if ('sub' in lastPart) {
				lastValue = lastPart.sub[lastPart.sub.length-1];
				if (f(lastValue, x)) {
					expr.push(lastPart);
					expr.push({val:x});
				} else {
					lastPart.sub.push(x);
					expr.push(lastPart);
				}
			} else {
				lastValue = lastPart.val;
				if (f(lastValue, x)) {
					expr.push(lastPart);
					expr.push({val:x});
				} else {
					expr.push({sub:[lastValue, x]});
				}
			}
		} else {
			expr.push({val:x});
		}
	}
	return expr;
	// @TODO optimize time with memory variables that store previous states throughout loop cycles
}

function rollToJoin(xs, f)
{
	var n = xs.length, i = 0;
	if (n < 2) return xs;
	var fst = xs[0],
	    lst = xs[n-1];
	while (!f(lst, fst) && i < n) {
		xs = roll(xs);
		fst = xs[0];
		lst = xs[n-1];
		i++;
	}
	return xs;
}

function roll(xs)
{
	var res = [];
	if (xs.length > 0) {
		var last = xs.length-1;
		res.push(xs[last]);
		xs.forEach(function(x,i){if(i<last) res.push(x);});
	}
	return res;
}

function areConvex(a, b) {return isConvex(b-a);}
function areConvex(a, b) {return isConvex(b-a);}
function isConvex(a) {var am = angleMod(a); return 0 <= am && am <= 180;} // more exactly == 180 is unspecified behavior
function isConvex(a) {var am = angleMod(a); return 0 <= am && am <= 180;} // more exactly == 180 is unspecified behavior
function angleMod(a) {return a>=0 ? a % 360 : (360 - (-a % 360)) % 360;}

function statistics(differ, xs)
{
	var diffs = tour(xs).map(uncurry(differ));
	return sum(diffs);
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

function signedRotAngleOfEdges(e, f) {return signedRotAngleOfVectors(edgeVector(e), edgeVector(f));}
function angleOfEdges(e, f) {return angleOfVectors(edgeVector(e), edgeVector(f));}

function vecEq(u, v) {return isPrefixOf(u, v) && isPrefixOf(v, u);}

function eq(a, b)
{
	if (typeof a == 'object' && typeof b == 'object') {
		return vecEq(a, b);
	} else {
		return a == b;
	} 
}

function isPrefixOf(as, bs)
{
	var ret = true;
	function andFoundInBs(key) {ret = ret && (key in bs) && bs.hasOwnProperty(key) && eq(bs[key], as[key]);} // @TODO: `i in bs` should be filtered too for bs.hasOwnProperty(i)
	Object.keys(as).forEach(andFoundInBs);
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

function areConvexDirectedEdges  (e, f) {return areConvexVectors  (edgeVector(e), edgeVector(f));}
function areConcaveDirectedEdges (e, f) {return areConcaveVectors (edgeVector(e), edgeVector(f));}
function areConcave0DirectedEdges(e, f) {return areConcave0Vectors(edgeVector(e), edgeVector(f));}
function edgeVector([p, q]) {return fromTo(p, q);}
function areConvexVectors  (u, v) {return det(u, v) >= 0;}
function areConcaveVectors (u, v) {return det(u, v) <  0;}
function areConcave0Vectors(u, v) {return det(u, v) <= 0;}

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

function scalarProduct ([a, b], [c, d]) {return a*c + b*d;}
function vectorLength  ([a, b]        ) {return Math.sqrt(a*a + b*b);}
function angleOfVectors(u , v)
{
	var val = scalarProduct(u, v) / (vectorLength(u) * vectorLength(v));
	if (val >  1) val =  1;
	if (val < -1) val = -1;
	return Math.acos(val) * 180 / Math.PI;
}

function signedRotAngleOfVectors(u , v)
{
	var measure = angleOfVectors(u, v);
	var dir = det(u, v);
	return (dir >= 0 ? 1 : -1) * measure;
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

function sum(xs) {return xs.reduce(bPlus, 0);} // `foldl(bPlus, 0, xs)`

function pointwise(f)
{
	function pf(xs, ys)
	{
		var res = [];
		function pushSum(val, key) {res.push(val + ys[key]);}
		xs.forEach(pushSum);
		return res;
	}
	return pf;
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

function bPlus(a, b) {return a + b;}
function bAnd (a, b) {return a && b;}
function bOr (a, b) {return a || b;}
