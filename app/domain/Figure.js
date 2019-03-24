/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function sampleFigureBank() { return [
	(new Figure([0, 0], [[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red' })).translation([-6,5]),
	(new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'})).translation([-8,-4,]),
	(new Figure([0, 0], poly1_convex_ccw, {fill: 'magenta'})).translation([-18,0]),
	(new Figure([0, 0], poly1_concave_ccw, {fill: 'green'})).translation([8,-7]),
	(new Figure([0, 0], poly2_convex_ccw, {fill: 'black'})).translation([0,-4]),
	(new Figure([0, 0], poly2_degen_ccw, {fill: 'gray'})).translation([-2.3,-0.7]),
	(new Figure([0, 0], poly2_concave_ccw, {fill: 'orange'})).translation([-4,2.6])
];}

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

	var grasp, vertices, svgAttributes = {}; // @TODO make `testTranslation` stricter, it should fail if this implementation returned a naked literal object instead of a Figure instance with methods
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			switch (key) {
				case 'grasp':
					var [x0, y0] = [this.grasp[0], this.grasp[1]];
					grasp = [x0+dx, y0+dy];
					break;
				case 'vertices':
					vertices = this.vertices.map(displace);
					break;
				default:
					svgAttributes[key] = this[key];
			}
		}
	}
	return new Figure(grasp, vertices, svgAttributes);
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
