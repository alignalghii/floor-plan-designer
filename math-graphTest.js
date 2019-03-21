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

