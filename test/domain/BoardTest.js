/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function testEmptyBoard() {return vecEq(emptyBoard, {next_id: 'fig_1', figures: {}});}

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

function testFigureId()
{
	return	figureId(3) == 'fig_3';
}

function testFigureNum()
{
	return	figureNum('fig_3') == 3;
}

