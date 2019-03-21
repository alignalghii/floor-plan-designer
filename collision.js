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



function lineSide(linePoint,lineVector, testPoint)
{
	return det(lineVector, fromTo(linePoint, testPoint));
}


function edgeVector([p, q]) {return fromTo(p, q);}
function areConvexVectors  (u, v) {return det(u, v) >= 0;}
function areConcaveVectors (u, v) {return det(u, v) <  0;}
function areConcave0Vectors(u, v) {return det(u, v) <= 0;}
