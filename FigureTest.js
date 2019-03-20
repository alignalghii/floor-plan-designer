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
