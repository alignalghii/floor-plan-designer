/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function testBoardTest() {return testEmptyBoard() && testAddFigure() && testDeleteFigure() && testUpdateFigure() && testAppendLoadFrom() && testCollidesAny() && testFigureId() && testFigureNum();}


function testEmptyBoard() {return vecEq(new Board(), {next_id: 'fig_1', figures: [], focus_id: null});}

/*@TODO procedural*/
function testAddFigure()
{
	var board = new Board(
		'fig_12',
		{
			fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
			fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
			fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
		}
	);
	var flag1 = board.addFigure({grasp: [0, 0], vertices: [[-1,-1], [-3,-1], [-2,-2]], fill: 'magenta'}) == 'fig_12';
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
					},
				focus_id: null
			}
	);
	return flag1 && flag2;
}

/*@TODO procedural*/
function testDeleteFigure()
{
	var board = new Board(
		'fig_12',
		{
			fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
			fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
			fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
		}
	);
	board.deleteFigure('fig_4');
	return	vecEq(
			board,
			{
				next_id: 'fig_12',
				figures:
					{
						fig_1 : {grasp: [0, 0], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]], fill: 'red' }, // a triangle
						fig_6 : {grasp: [0, 0], vertices: [[20, 0], [22, 0], [21 ,1]], fill: 'blue'}  // a third triangle even further away
					},
					focus_id: null
			}
	);
}

/*@TODO procedural*/
function testUpdateFigure()
{
	var board = new Board(
		'fig_12',
		{
			fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
			fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
			fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
		}
	);
	board.updateFigure('fig_4', {grasp: [1, 0], vertices: [[11,0], [13,0], [12,1]], fill: 'magenta'});
	return	vecEq(
			board,
			{
				next_id: 'fig_12',
				figures:
					{
						fig_1 : {grasp: [0, 0], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]], fill: 'red'    }, // a triangle
						fig_4 : {grasp: [1, 0], vertices: [[11, 0], [13, 0], [12 ,1]], fill: 'magenta'}, // another triangle further away
						fig_6 : {grasp: [0, 0], vertices: [[20, 0], [22, 0], [21 ,1]], fill: 'blue'   }  // a third triangle even further away
					},
				focus_id: null
			}
	);
}

function testAppendLoadFrom()
{
	var board = new Board(
		'fig_12',
		{
			fig_1: {grasp: [0, 0], vertices: [[ 0,0], [ 2,0], [ 1,1]], fill: 'red'  }, // a triangle
			fig_4: {grasp: [0, 0], vertices: [[10,0], [12,0], [11,1]], fill: 'green'}, // another triangle further away
			fig_6: {grasp: [0, 0], vertices: [[20,0], [22,0], [21,1]], fill: 'blue' }  // a third triangle even further away
		},
		focus_id = null
	);
	board.appendLoadFrom([
		new Figure([0, 1], [[ 0, 0], [ 2, 0], [ 1 ,1]]),
		new Figure([1, 2], [[11, 0], [13, 0], [12 ,1]]),
		new Figure([2, 3], [[20, 0], [22, 0], [21 ,1]])
	]);
	return	vecEq(
			board,
			{
				next_id: 'fig_15',
				figures:
					{
						fig_1 : {grasp: [0, 0], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]], fill: 'red'  }, // a triangle
						fig_4 : {grasp: [0, 0], vertices: [[10, 0], [12, 0], [11 ,1]], fill: 'green'}, // another triangle further away
						fig_6 : {grasp: [0, 0], vertices: [[20, 0], [22, 0], [21 ,1]], fill: 'blue' },  // a third triangle even further away

						fig_12: {grasp: [0, 1], vertices: [[ 0, 0], [ 2, 0], [ 1 ,1]]}, // a triangle
						fig_13: {grasp: [1, 2], vertices: [[11, 0], [13, 0], [12 ,1]]}, // another triangle further away
						fig_14: {grasp: [2, 3], vertices: [[20, 0], [22, 0], [21 ,1]]}  // a third triangle even further away
					},
				focus_id: null
			}
	);

}

function testCollidesAny()
{
	var board1 = new Board();
	var figure11 = new Figure([0, 0], [[100, 100], [102, 100], [101, 101]]);
	var figure12 = new Figure([0, 0], [[  0,  -1], [  2,  -1], [  1,   0]]);
	var figure13 = new Figure([0, 0], [[  1,   0], [ 11,   0], [  6,   1]]);
	board1.appendLoadFrom([
		new Figure([0, 0], [[ 0, 0], [ 2, 0], [ 1 ,1]]),
		new Figure([0, 0], [[11, 0], [13, 0], [12 ,1]]),
		new Figure([0, 0], [[20, 0], [22, 0], [21 ,1]])
	]);
	var flag1 = !board1.collidesAny(figure11) && board1.collidesAny(figure12) && board1.collidesAny(figure13);
	return flag1;
}

function testFigureId()
{
	return	figureId(3) == 'fig_3';
}

function testFigureNum()
{
	return	figureNum('fig_3') == 3;
}

