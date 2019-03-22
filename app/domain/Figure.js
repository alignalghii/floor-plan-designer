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

	var objectOut = {}; // @TODO make `testTranslation` stricter, it should fail if this implementation returned a naked literal object instead of a Figure instance with methods
	var value;
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			switch (key) {
				case 'grasp':
					var [x0, y0] = [this.grasp[0], this.grasp[1]];
					value = [x0+dx, y0+dy];
					break;
				case 'vertices':
					value = this.vertices.map(displace);
					break;
				default:
					value = this[key];
			}
			objectOut[key] = value;
		}
	}
	return new Figure(objectOut.grasp, objectOut.vertices);
	// @TODO make `testTranslation` stricter, it should fail if this implementation returned a naked literal object instead of a Figure instance with methods
}

Figure.prototype.doTranslation = function ([dx, dy])
{
	function displace(point) {point[0] = point[0]+dx; point[1] = point[1] + dy;}
	this.vertices.forEach(displace);
	this.grasp[0] += dx;
	this.grasp[1] += dy;
}

Figure.prototype.collidesTowards = function (figure) {return collidesTowards(this.vertices, figure.vertices);};
Figure.prototype.collides        = function (figure) {return collides       (this.vertices, figure.vertices);};
