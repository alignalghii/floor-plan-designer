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
