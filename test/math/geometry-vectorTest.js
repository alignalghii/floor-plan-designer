function GeometryVectorTest() {}

GeometryVectorTest.prototype.run = function() {return this.testFromTo() && this.testScalarProduct() && this.testVectorLength() && this.testSignedRotAngleOfVectors() && this.testAngleOfVectors() && this.testDet() && this.testDomainToSvgFactory() && this.testSvgToDomainFactory();}


GeometryVectorTest.prototype.testFromTo = function() {return vecEq(fromTo([3, 7], [5, 12]), [2, 5]);}

GeometryVectorTest.prototype.testScalarProduct = function()
{
	return	scalarProduct([ 0,  0], [ 2,  3]) ==  0 &&
		scalarProduct([ 2,  5], [ 7,  3]) == 29 &&
		scalarProduct([-2,  5], [ 7,  3]) ==  1 &&
		scalarProduct([ 2,  5], [ 7, -3]) == -1;
}

GeometryVectorTest.prototype.testVectorLength = function()
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

GeometryVectorTest.prototype.testSignedRotAngleOfVectors = function()
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

GeometryVectorTest.prototype.testAngleOfVectors = function()
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

GeometryVectorTest.prototype.testDet = function()
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



/******************************
 * Transition between coordinate sytems:
 ******************************/

GeometryVectorTest.prototype.testDomainToSvgFactory = function()
{
	var f1=	vecEq(domainToSvgFactory([600, 400], 10)([  0,   0]), [300, 200]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([  3,   2]), [330, 180]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([  3,  -2]), [330, 220]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([ -3,   2]), [270, 180]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([ -3,  -2]), [270, 220]) ;

	var domainToSvg = domainToSvgFactory([600, 400], 10);
	var svgVertices = [[2,1], [6,2], [7,5], [5,7], [1,6]].map(domainToSvg);
	var f2 = vecEq(svgVertices, [[320,190], [360,180], [370,150], [350,130], [310,140]]);

	return f1 && f2;
}

GeometryVectorTest.prototype.testSvgToDomainFactory = function()
{
	return	vecEq(svgToDomainFactory([600, 400], 10)([300, 200]), [ 0,  0]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([330, 180]), [ 3,  2]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([330, 220]), [ 3, -2]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([270, 180]), [-3,  2]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([270, 220]), [-3, -2]) ;
}
