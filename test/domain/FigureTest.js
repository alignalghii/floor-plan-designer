/**************************
 * Geometric transformations (translation, reflection, rotation)
 **************************/

function testFigureTest() {return testFigureCollides() && testFigureCollidesTowards() && testDoTranslation() && testTranslation();}


function testFigureCollides()
{
	var figure1_convex_ccv = new Figure([0,0], poly1_convex_ccw);

	var aFigure1 = new Figure([0, 0], [[ 4,-2], [3,2], [2,-1]]);
	var aFigure2 = new Figure([0, 0], [[ 4,-4], [3,0], [2,-3]]);
	var aFigure3 = new Figure([0, 0], [[ 3,-2], [2,2], [1,-1]]);
	var aFigure4 = new Figure([0, 0], [[-1, 5], [1,4], [2, 7]]);
	var aFigure5 = new Figure([0, 0], [[ 0, 4], [1,4], [2, 7]]);

	return	 aFigure1.collides(figure1_convex_ccv) &&
		!aFigure2.collides(figure1_convex_ccv) &&
		 aFigure3.collides(figure1_convex_ccv) &&
		 aFigure4.collides(figure1_convex_ccv) && // OK but out of wrong cause
		!aFigure5.collides(figure1_convex_ccv) ;  // !!! :(
}

function testFigureCollidesTowards()
{
	var figure1_convex_ccv = new Figure([0,0], poly1_convex_ccw);

	var aFigure1 = new Figure([0, 0], [[ 4,-2], [3,2], [2,-1]]);
	var aFigure2 = new Figure([0, 0], [[ 4,-4], [3,0], [2,-3]]);
	var aFigure3 = new Figure([0, 0], [[ 3,-2], [2,2], [1,-1]]);
	var aFigure4 = new Figure([0, 0], [[-1, 5], [1,4], [2, 7]]);
	var aFigure5 = new Figure([0, 0], [[ 0, 4], [1,4], [2, 7]]);

	return	 aFigure1          .collidesTowards(figure1_convex_ccv) &&
		!figure1_convex_ccv.collidesTowards(aFigure1          ) &&

		!aFigure2          .collidesTowards(figure1_convex_ccv) &&
		!figure1_convex_ccv.collidesTowards(aFigure2          ) &&

		 aFigure3          .collidesTowards(figure1_convex_ccv) &&
		 figure1_convex_ccv.collidesTowards(aFigure3          ) &&

		!aFigure4          .collidesTowards(figure1_convex_ccv) && // !!! :(
		 figure1_convex_ccv.collidesTowards(aFigure4          ) &&

		!aFigure5          .collidesTowards(figure1_convex_ccv) && // !!! :(
		!figure1_convex_ccv.collidesTowards(aFigure5          ) ;  // !!! :(
}

function testDoTranslation()
{
	var figure      = new Figure([0, 0], [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]], {fill: 'red'});
	// var expectedFig = new Figure( ... @TODO methods should be compared too. See test/domain/FigureTest::translation TODO
	figure.doTranslation([3, 2]);
	return vecEq(figure, {grasp: [3, 2], vertices: [[5, 3], [9, 4], [10, 7], [8, 9], [4, 8]], fill: 'red'});
}

function testTranslation()
{
	var figure1 = new Figure([0, 0], [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]], {fill: 'red'});
	var figure2 = figure1.translation([3, 2]);
	return	vecEq(figure1, {grasp: [0, 0], vertices: [[2, 1], [6, 2], [ 7, 5], [5, 7], [1, 6]], fill: 'red'}) &&
		vecEq(figure2, {grasp: [3, 2], vertices: [[5, 3], [9, 4], [10, 7], [8, 9], [4, 8]], fill: 'red'});
}
