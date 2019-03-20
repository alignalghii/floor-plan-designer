/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function testDoTranslation()
{
	var figure = {grasp: [0, 0], vertices: [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]], fill: 'red'};
	doTranslation([3, 2], figure);
	return vecEq(figure, {grasp: [3, 2], vertices: [[5, 3], [9, 4], [10, 7], [8, 9], [4, 8]], fill: 'red'});
}

function testTranslation()
{
	var figure1 = {grasp: [0, 0], vertices: [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]], fill: 'red'};
	var figure2 = translation([3, 2], figure1);
	return	vecEq(figure1, {grasp: [0, 0], vertices: [[2, 1], [6, 2], [ 7, 5], [5, 7], [1, 6]], fill: 'red'}) &&
		vecEq(figure2, {grasp: [3, 2], vertices: [[5, 3], [9, 4], [10, 7], [8, 9], [4, 8]], fill: 'red'});
}



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
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function testEmptyBoard() {return vecEq(emptyBoard, {next_id: 'fig_1', figures: {}});}

/*@TODO procedural*/
function testAddFigure()
{
	var board =
		{
			next_id: 'fig_12',
			figures:
				{
					fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
					fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
					fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
				}
		};
	var flag1 = addFigure({grasp: [0, 0], vertices: [[-1,-1], [-3,-1], [-2,-2]], fill: 'magenta'}, board) == 'fig_12';
	var flag2 = vecEq(
			board,
			{
				next_id: 'fig_13',
				figures:
					{
						fig_1 : {grasp: [0, 0], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]], fill: 'red'    }, // a triangle
						fig_4 : {grasp: [0, 0], vertices: [[10, 0], [12, 0], [11 ,1]], fill: 'green'  }, // another triangle further away
						fig_6 : {grasp: [0, 0], vertices: [[20, 0], [22, 0], [21 ,1]], fill: 'blue'   }, // a third triangle even further away
						fig_12: {grasp: [0, 0], vertices: [[-1,-1], [-3,-1], [-2,-2]], fill: 'magenta'}
					}
			}
	);
	return flag1 && flag2;
}

/*@TODO procedural*/
function testDeleteFigure()
{
	var board =
		{
			next_id: 'fig_12',
			figures:
				{
					fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
					fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
					fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
				}
		};
	deleteFigure('fig_4', board);
	return	vecEq(
			board,
			{
				next_id: 'fig_12',
				figures:
					{
						fig_1 : {grasp: [0, 0], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]], fill: 'red' }, // a triangle
						fig_6 : {grasp: [0, 0], vertices: [[20, 0], [22, 0], [21 ,1]], fill: 'blue'}  // a third triangle even further away
					}
			}
	);
}

/*@TODO procedural*/
function testUpdateFigure()
{
	var board =
		{
			next_id: 'fig_12',
			figures:
				{
					fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
					fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
					fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
				}
		};

	updateFigure('fig_4', {grasp: [1, 0], vertices: [[11,0], [13,0], [12,1]], fill: 'magenta'}, board);
	return	vecEq(
			board,
			{
				next_id: 'fig_12',
				figures:
					{
						fig_1 : {grasp: [0, 0], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]], fill: 'red'    }, // a triangle
						fig_4 : {grasp: [1, 0], vertices: [[11, 0], [13, 0], [12 ,1]], fill: 'magenta'}, // another triangle further away
						fig_6 : {grasp: [0, 0], vertices: [[20, 0], [22, 0], [21 ,1]], fill: 'blue'   }  // a third triangle even further away
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
