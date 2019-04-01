/*******************************
 * Drawing figure:
 *******************************/

function SvgLowLevelTest() {}

SvgLowLevelTest.prototype.run = function() {return this.testPointsArgValue() && this.testStringifyPositionWithComma();}


SvgLowLevelTest.prototype.testPointsArgValue = function() {return pointsArgValue([[320,190], [360,180], [370,150], [350,130], [310,140]]) == '320,190 360,180 370,150 350,130 310,140';}

SvgLowLevelTest.prototype.testStringifyPositionWithComma = function() {return stringifyPositionWithComma([12,7]) == '12,7';}
