/*******************************
 * Drawing figure:
 *******************************/

function testDrawFigureAux()
{
	var domainToSvg = domainToSvgFactory([600, 400], 10);
	return drawFigureAux(domainToSvg, [[2,1], [6,2], [7,5], [5,7], [1,6]]) == '320,190 360,180 370,150 350,130 310,140';
}

function testStringifyPositionWithComma() {return stringifyPositionWithComma([12,7]) == '12,7';}
