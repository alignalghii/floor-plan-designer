function testFromTo() {return vecEq(fromTo([3, 7], [5, 12]), [2, 5]);}

function testScalarProduct()
{
	return	scalarProduct([ 0,  0], [ 2,  3]) ==  0 &&
		scalarProduct([ 2,  5], [ 7,  3]) == 29 &&
		scalarProduct([-2,  5], [ 7,  3]) ==  1 &&
		scalarProduct([ 2,  5], [ 7, -3]) == -1;
}

function testVectorLength()
{
	return	vectorLength([0 ,  0]) == 0 &&
		vectorLength([0 ,  6]) == 6 &&
		vectorLength([7 ,  0]) == 7 &&
		vectorLength([0 , -6]) == 6 &&
		vectorLength([-7,  0]) == 7 &&
		vectorLength([ 3,  4]) == 5 &&
		vectorLength([ 3, -4]) == 5 &&
		vectorLength([-3,  4]) == 5 &&
		vectorLength([-3, -4]) == 5 ;
}

function cca(x, r) {return Math.abs(x - r) < 0.001;}

function testSignedRotAngleOfVectors()
{
	return	cca(signedRotAngleOfVectors([ 1,  0], [ 0,  1]),  90) &&
		cca(signedRotAngleOfVectors([ 1,  0], [ 1,  1]),  45) &&
		cca(signedRotAngleOfVectors([ 2,  0], [ 0,  3]),  90) &&
		cca(signedRotAngleOfVectors([ 5,  0], [ 7,  7]),  45) &&
		cca(signedRotAngleOfVectors([ 0,  1], [ 1,  0]), -90) &&
		cca(signedRotAngleOfVectors([ 1,  1], [ 1,  0]), -45) &&
		cca(signedRotAngleOfVectors([ 1,  1], [ 0,  1]),  45) &&
		cca(signedRotAngleOfVectors([ 0,  1], [ 1,  1]), -45) &&
		cca(signedRotAngleOfVectors([ 2,  0], [-2,  0]), 180) &&
		cca(signedRotAngleOfVectors([ 2,  3], [-4, -6]), 180) ;
}

function testAngleOfVectors()
{
	return	cca(angleOfVectors([ 1,  0], [ 0,  1]),  90) &&
		cca(angleOfVectors([ 1,  0], [ 1,  1]),  45) &&
		cca(angleOfVectors([ 2,  0], [ 0,  3]),  90) &&
		cca(angleOfVectors([ 5,  0], [ 7,  7]),  45) &&
		cca(angleOfVectors([ 0,  1], [ 1,  0]),  90) &&
		cca(angleOfVectors([ 1,  1], [ 1,  0]),  45) &&
		cca(angleOfVectors([ 1,  1], [ 0,  1]),  45) &&
		cca(angleOfVectors([ 0,  1], [ 1,  1]),  45) &&
		cca(angleOfVectors([ 2,  0], [-2,  0]), 180) &&
		cca(angleOfVectors([ 2,  3], [-4, -6]), 180) ; // a naive implementation provides `NaN` through `acos(-1.0000...2)`
}

function testDet()
{
	return	det([ 2,  1], [ 2,  1]) == 0 &&
		det([ 2,  1], [ 1,  1]) >  0 &&
		det([ 2,  2], [ 1,  1]) == 0 &&
		det([ 2,  1], [ 0,  1]) >  0 &&
		det([ 2,  1], [-1,  1]) >  0 &&
		det([ 2,  1], [-1,  0]) >  0 &&
		det([ 2,  1], [-2, -1]) == 0 &&
		det([ 2,  1], [-4, -2]) == 0 &&
		det([ 2,  1], [-1, -1]) <  0 &&
		det([ 2,  1], [-1, -2]) <  0 &&
		det([ 2,  1], [ 0, -1]) <  0 &&
		det([ 2,  1], [ 1, -2]) <  0 &&
		det([ 2,  1], [ 1, -1]) <  0 &&
		det([ 2,  1], [ 2, -1]) <  0 &&
		det([ 2,  1], [ 1,  0]) <  0 &&
		det([ 2,  1], [ 2,  0]) <  0;
}
