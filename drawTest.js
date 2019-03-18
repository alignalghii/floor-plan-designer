/*******************************
 * Drawing figure:
 *******************************/

function testDrawFigureAux()
{
	var domainToSvg = domainToSvgFactory([600, 400], 10);
	return drawFigureAux(domainToSvg, [[2,1], [6,2], [7,5], [5,7], [1,6]]) == '320,190 360,180 370,150 350,130 310,140';
}

function testStringifyPositionWithComma() {return stringifyPositionWithComma([12,7]) == '12,7';}

/******************************
 * Transition between coordinate sytems:
 ******************************/

function testDomainToSvgFactory()
{
	return	vecEq(domainToSvgFactory([600, 400], 10)([  0,   0]), [300, 200]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([  3,   2]), [330, 180]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([  3,  -2]), [330, 220]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([ -3,   2]), [270, 180]) &&
		vecEq(domainToSvgFactory([600, 400], 10)([ -3,  -2]), [270, 220]) ;
}

function testSvgToDomainFactory()
{
	return	vecEq(svgToDomainFactory([600, 400], 10)([300, 200]), [ 0,  0]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([330, 180]), [ 3,  2]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([330, 220]), [ 3, -2]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([270, 180]), [-3,  2]) &&
		vecEq(svgToDomainFactory([600, 400], 10)([270, 220]), [-3, -2]) ;
}
