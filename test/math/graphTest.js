function GraphTest(nOK = 0, nAll = 0) {Test.call(this, nOK, nAll);}

GraphTest.prototype = Object.create(Test.prototype);

GraphTest.prototype.constructor = GraphTest;


GraphTest.prototype.testStatistics = function()
{
	function tPer(m, n) {return m/n;}
	function tMul(m, n) {return m*n;}
	return	statistics(tPer, [10, 20, 100]) == 10/20 + 20/100 + 100/10 &&
		statistics(tMul, [10, 20, 100]) == 10*20 + 20*100 + 100*10 &&
		statistics(tPer, [           ]) ==  0                      &&
		statistics(tMul, [           ]) ==  0                      &&
		statistics(tMul, [ 7         ]) == 49                      ;
}


GraphTest.prototype.testTour = function()
{
	return	vecEq(tour([10, 20, 30]), [[10, 20], [20, 30], [30, 10]]) &&
		vecEq(tour([10, 20    ]), [[10, 20], [20, 10]          ]) &&
		vecEq(tour([10        ]), [[10, 10]                    ]) &&
		vecEq(tour([          ]), [                            ]);
}

GraphTest.prototype.testRoll = function()
{
	return	vecEq(roll([              ]), [              ]) &&
		vecEq(roll([10            ]), [10            ]) &&
		vecEq(roll([10, 20        ]), [20, 10        ]) &&
		vecEq(roll([10, 20, 30    ]), [30, 10, 20    ]) &&
		vecEq(roll([10, 20, 30, 40]), [40, 10, 20, 30]);
}
