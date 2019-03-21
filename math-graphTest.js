function testStatistics()
{
	function tPer(m, n) {return m/n;}
	function tMul(m, n) {return m*n;}
	return	statistics(tPer, [10, 20, 100]) == 10/20 + 20/100 + 100/10 &&
		statistics(tMul, [10, 20, 100]) == 10*20 + 20*100 + 100*10 &&
		statistics(tPer, [           ]) ==  0                      &&
		statistics(tMul, [           ]) ==  0                      &&
		statistics(tMul, [ 7         ]) == 49                      ;
}


function testTour()
{
	return	vecEq(tour([10, 20, 30]), [[10, 20], [20, 30], [30, 10]]) &&
		vecEq(tour([10, 20    ]), [[10, 20], [20, 10]          ]) &&
		vecEq(tour([10        ]), [[10, 10]                    ]) &&
		vecEq(tour([          ]), [                            ]);
}

function testRoll()
{
	return	vecEq(roll([              ]), [              ]) &&
		vecEq(roll([10            ]), [10            ]) &&
		vecEq(roll([10, 20        ]), [20, 10        ]) &&
		vecEq(roll([10, 20, 30    ]), [30, 10, 20    ]) &&
		vecEq(roll([10, 20, 30, 40]), [40, 10, 20, 30]);
}

