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
