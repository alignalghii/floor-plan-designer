/*******************************
 * Query the Board: Abstract modeling of events, and enabling acting both on abstract representation with concrete SVG level
 *******************************/

function DataHashTest(nOK = 0, nAll = 0) {Test.call(this, nOK, nAll);}

DataHashTest.prototype = Object.create(Test.prototype);

DataHashTest.prototype.constructor = DataHashTest;


DataHashTest.prototype.testSelectByMax = function() // nearness, approaching, sticking
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


DataHashTest.prototype.testSelectByProp = function() // insideness
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
