/*******************************
 * Manipulate the Board: board algebra, board operations
 * @TODO: either the pure functional (FP) way, or the pure procedural (in-place) way, but not this mixed style
 *******************************/

function Board(next_id = 'fig_1', figures = {}, focus_id = null) {this.next_id = next_id; this.figures = figures; this.focus_id = focus_id;}

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

Board.prototype.appendLoadFrom = function (figureBank)
{
	var that = this; function addIt(figure) {that.addFigure(figure);}
	figureBank.forEach(addIt);
	// figureBank.forEach((figure) => this.addFigure(figure)); // @TODO it is also good, maybe less portable
}

Board.prototype.collidesAny = function (figure)
{
	var collision = false;
	for (var key in this.figures) {
		if (this.figures.hasOwnProperty(key) && key != this.focus_id) {
			if (this.figures[key].collides(figure)) {
				collision = true;
				break;
			}
		}
	}
	return collision;
	// @TODO: works only for arrays, not for assoc arrays = objects
	//function orCollides (flag, anotherFigure) {return flag || figure.collides(anotherFigure);}
	//return this.figures.reduce(orCollides, false);
}


function figureNum(id) {return parseInt(/.*_(.*)/.exec(id)[1]);}  // @TODO Should it be `Board.prototype.figureNum`? Or maybe `Board.figureNum`?
function figureId (n ) {return 'fig_' + n;}                       // @TODO Should it be `Board.prototype.figureId` ? Or maybe `Board.figureId` ?

Board.prototype.loopOverFigures = function (callback)
{
	for (var id in this.figures)
		if (this.figures.hasOwnProperty(id))
			callback(id, this.figures[id]);
}
