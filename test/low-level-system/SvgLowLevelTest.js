/*******************************
 * Drawing figure:
 *******************************/

function SvgLowLevelTest(nOK = 0, nAll = 0) {Test.call(this, nOK, nAll);}

SvgLowLevelTest.prototype = Object.create(Test.prototype);

SvgLowLevelTest.prototype.constructor = SvgLowLevelTest;


SvgLowLevelTest.prototype.testPointsArgValue = function() {return pointsArgValue([[320,190], [360,180], [370,150], [350,130], [310,140]]) == '320,190 360,180 370,150 350,130 310,140';}

SvgLowLevelTest.prototype.testStringifyPositionWithComma = function() {return stringifyPositionWithComma([12,7]) == '12,7';}
