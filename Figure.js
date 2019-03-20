/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function Figure(grasp, vertices, svgAttributes)
{
	this.grasp    = grasp;
	this.vertices = vertices;
	for (attrName in svgAttributes) {
		this[attrName] = svgAttributes[attrName];
	}
}

Figure.prototype.translation = function ([dx, dy])
{
	function displace([x,y]) {return [x+dx, y+dy];}  // @TODO curry(pointwise(bPlus))(displacement)

	var figureOut = {}, value;
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			switch (key) {
				case 'grasp':
					var [x0, y0] = this.grasp;
					value = [x0+dx, y0+dy];
					break;
				case 'vertices':
					value = this.vertices.map(displace);
					break;
				default:
					value = this[key];
			}
			figureOut[key] = value;
		}
	}
	return figureOut;
}

Figure.prototype.doTranslation = function ([dx, dy])
{
	function displace(point) {point[0] = point[0]+dx; point[1] = point[1] + dy;}
	this.vertices.forEach(displace);
	this.grasp[0] += dx;
	this.grasp[1] += dy;
}
