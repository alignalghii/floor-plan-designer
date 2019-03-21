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

function sum(xs) {return xs.reduce(bPlus, 0);} // `foldl(bPlus, 0, xs)`


function lAnd(stats)
{
	var status = true;
	stats.forEach(function (stat) {status = status && stat;}) // @TODO `foldl` / `reduce`
	return status;
}

function lOr(stats)
{
	var status = false;
	stats.forEach(function (stat) {status = status || stat;})  // @TODO `foldl` / `reduce`
	return status;
}

function minus(a, b)
{
	var [a1, a2] = a;
	var [b1, b2] = b;
	return [a1-b1, a2-b2];
}

function same(stats)
{
	return lAnd(stats) || !lOr(stats); // stats.reduce(bAnd, true) || !stats.reduce(bOr, false)
}

function uncurry(f) {return function ([a, b]) {return f(a, b);};}
