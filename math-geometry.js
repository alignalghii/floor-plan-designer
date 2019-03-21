function areConvex(a, b) {return isConvex(b-a);}
function areConvex(a, b) {return isConvex(b-a);}
function isConvex(a) {var am = angleMod(a); return 0 <= am && am <= 180;} // more exactly == 180 is unspecified behavior
function isConvex(a) {var am = angleMod(a); return 0 <= am && am <= 180;} // more exactly == 180 is unspecified behavior
function angleMod(a) {return a>=0 ? a % 360 : (360 - (-a % 360)) % 360;}




function lineSide(linePoint,lineVector, testPoint)
{
	return det(lineVector, fromTo(linePoint, testPoint));
}


function edgeVector([p, q]) {return fromTo(p, q);}
function areConvexVectors  (u, v) {return det(u, v) >= 0;}
function areConcaveVectors (u, v) {return det(u, v) <  0;}
function areConcave0Vectors(u, v) {return det(u, v) <= 0;}
