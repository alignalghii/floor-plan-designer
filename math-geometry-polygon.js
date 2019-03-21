const poly1_convex_ccw = [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]];
const poly1_convex_cw  = [[2, 1], [1, 6], [5, 7], [7, 5], [6, 2]];

const poly1_concave_ccw = [[ 4, -1], [ 7,  2], [ 5,  2], [ 4,  4], [ 5,  7], [ 3,  9], [ 3,  3], [-3,  5], [-3,  2], [-1,  1], [-2,  -2]];
const poly1_concave_cw  = [[ 4, -1], [-2, -2], [-1,  1], [-3,  2], [-3,  5], [ 3,  3], [ 3,  9], [ 5,  7], [ 4,  4], [ 5,  2], [ 7,  2]];

const poly2_convex_ccw  = [[ 0, -2], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_convex_cw   = [[ 0, -2], [-2, -1], [ 0,  1], [ 2, -1]];
const poly2_degen_ccw   = [[ 0, -1], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_degen_cw    = [[ 0, -1], [-2, -1], [ 0,  1], [ 2, -1]];
const poly2_concave_ccw = [[ 0,  0], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_concave_cw  = [[ 0,  0], [-2, -1], [ 0,  1], [ 2, -1]];



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


function signedRotAngleOfEdges(e, f) {return signedRotAngleOfVectors(edgeVector(e), edgeVector(f));}
function angleOfEdges(e, f) {return angleOfVectors(edgeVector(e), edgeVector(f));}


function sectionSide(point1, point2, testPoint)
{
	var lineVector = fromTo(point1, point2);
	return lineSide(point1, lineVector, testPoint);
}


function areConvexDirectedEdges  (e, f) {return areConvexVectors  (edgeVector(e), edgeVector(f));}
function areConcaveDirectedEdges (e, f) {return areConcaveVectors (edgeVector(e), edgeVector(f));}
function areConcave0DirectedEdges(e, f) {return areConcave0Vectors(edgeVector(e), edgeVector(f));}
