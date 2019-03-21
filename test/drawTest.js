/*******************************
 * Query the Board: Abstract modeling of events, and enabling acting both on abstract representation with concrete SVG level
 *******************************/

function testSelectByMax() // nearness, approaching, sticking
{
	function sumOfSumOfCoordPairs(figure) {return sum(figure.vertices.map(sum));}
	return	vecEq(
			selectByMax(
				sumOfSumOfCoordPairs,
				{
					fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
					fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
					fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
				}
			),
			['fig_6'] // exactly the third one (second in zero-based)
		);
}


function testSelectByProp() // insideness
{
	return	vecEq(
			selectByProp(
				function (figure) {return inside([1,1], figure.vertices);},
				{
					fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
					fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
					fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
				}
			),
			['fig_1']  // exactly the first one (zeroth in zero-based)
		);
}


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
