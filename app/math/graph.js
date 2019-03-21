function statistics(differ, xs)
{
	var diffs = tour(xs).map(uncurry(differ));
	return sum(diffs);
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
