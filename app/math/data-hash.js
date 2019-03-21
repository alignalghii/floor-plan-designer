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
