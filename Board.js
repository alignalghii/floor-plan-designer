/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

const emptyBoard = {next_id: 'fig_1', figures: {}};

/*@TODO procedural*/
function addFigure(figure, board)
{
	var id  = board.next_id;
	var n  = figureNum(id);
	board.figures[id] = figure;
	board.next_id = figureId(n+1);
	return id;
}

/*@TODO procedural*/
function deleteFigure(id, board) {delete board.figures[id];}

/*@TODO procedural*/
function updateFigure(id, figure, board){board.figures[id] = figure;}


function figureNum(id) {return parseInt(/.*_(.*)/.exec(id)[1]);}
function figureId (n ) {return 'fig_' + n;}

