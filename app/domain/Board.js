/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function Board(next_id = 'fig_1', figures = [], focus_id = null) {this.next_id = next_id; this.figures = figures; this.focus_id = focus_id;}

/*@TODO procedural*/
Board.prototype.addFigure = function (figure, board)
{
	var id  = this.next_id;
	var n  = figureNum(id);
	this.figures[id] = figure;
	this.next_id = figureId(n+1);
	return id;
}

/*@TODO procedural*/
Board.prototype.deleteFigure = function (id, board) {delete this.figures[id];};

/*@TODO procedural*/
Board.prototype.updateFigure = function (id, figure, board) {this.figures[id] = figure;}


function figureNum(id) {return parseInt(/.*_(.*)/.exec(id)[1]);}  // @TODO Should it be `Board.prototype.figureNum`? Or maybe `Board.figureNum`?
function figureId (n ) {return 'fig_' + n;}                       // @TODO Should it be `Board.prototype.figureId` ? Or maybe `Board.figureId` ?

