/*******************************
 * Query the Board: Abstract modeling of events, and enabling acting both on abstract representation with concrete SVG level
 *******************************/

function testSelectByMax() // nearness, approaching, sticking
{
	function sumOfSumOfCoordPairs(figure) {return sum(figure.map(sum));}
	return	vecEq(
			selectByMax(
				sumOfSumOfCoordPairs,
				{
					fig_1: [[ 0,0], [ 2,0], [ 1,1]], // a triangle
					fig_4: [[10,0], [12,0], [11,1]], // another triangle further away
					fig_6: [[20,0], [22,0], [21,1]]  // a third triangle even further away
				}
			),
			['fig_6'] // exactly the third one (second in zero-based)
		);
}


function testSelectByProp() // insideness
{
	return	vecEq(
			selectByProp(
				function (figure) {return inside([1,1], figure);},
				{
					fig_1: [[ 0,0], [ 2,0], [ 1,1]], // a triangle
					fig_4: [[10,0], [12,0], [11,1]], // another triangle further away
					fig_6: [[20,0], [22,0], [21,1]]  // a third triangle even further away
				}
			),
			['fig_1']  // exactly the first one (zeroth in zero-based)
		);
}

/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

const emptyBoard = {next_id: 'fig_1', figures: {}};

function testAddFigure()
{
	return	vecEq(
			addFigure(
				[[-1,-1], [-3,-1], [-2,-2]],
				{
					next_id: 'fig_12',
					figures:
						{
							fig_1: [[ 0,0], [ 2,0], [ 1,1]], // a triangle
							fig_4: [[10,0], [12,0], [11,1]], // another triangle further away
							fig_6: [[20,0], [22,0], [21,1]]  // a third triangle even further away
						}
				},
			),
			[
				'fig_12',
				{
					next_id: 'fig_13',
					figures:
						{
							fig_1 : [[ 0, 0], [ 2, 0], [ 1 ,1]], // a triangle
							fig_4 : [[10, 0], [12, 0], [11 ,1]], // another triangle further away
							fig_6 : [[20, 0], [22, 0], [21 ,1]], // a third triangle even further away
							fig_12: [[-1,-1], [-3,-1], [-2,-2]]
						}
				}
			]
		);
}


function testDeleteFigure()
{
	return	vecEq(
			deleteFigure(
				'fig_4',
				{
					next_id: 'fig_12',
					figures:
						{
							fig_1: [[ 0,0], [ 2,0], [ 1,1]], // a triangle
							fig_4: [[10,0], [12,0], [11,1]], // another triangle further away
							fig_6: [[20,0], [22,0], [21,1]]  // a third triangle even further away
						}
				},
			),
			{
				next_id: 'fig_12',
				figures:
					{
						fig_1 : [[ 0, 0], [ 2, 0], [ 1 ,1]], // a triangle
						fig_6 : [[20, 0], [22, 0], [21 ,1]]  // a third triangle even further away
					}
			}
		);
}

function testUpdateFigure()
{
	return	vecEq(
			updateFigure(
				'fig_4',
				[[11,0], [13,0], [12,1]],
				{
					next_id: 'fig_12',
					figures:
						{
							fig_1: [[ 0,0], [ 2,0], [ 1,1]], // a triangle
							fig_4: [[10,0], [12,0], [11,1]], // another triangle further away
							fig_6: [[20,0], [22,0], [21,1]]  // a third triangle even further away
						}
				},
			),
			{
				next_id: 'fig_12',
				figures:
					{
						fig_1 : [[ 0, 0], [ 2, 0], [ 1 ,1]], // a triangle
						fig_4 : [[11, 0], [13, 0], [12 ,1]], // another triangle further away
						fig_6 : [[20, 0], [22, 0], [21 ,1]]  // a third triangle even further away
					}
			}
		);
}

function testFigureId()
{
	return	figureId(3) == 'fig_3';
}

function testFigureNum()
{
	return	figureNum('fig_3') == 3;
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
