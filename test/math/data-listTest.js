function DataListTest() {}

DataListTest.prototype.run = function() {return this.testUncurry() && this.testFoldl() && this.testEq() && this.testVecEq() && this.testIsPrefixOf() && this.testDepth() && this.testSame() && this.testSum() && this.testPointwise() && this.testAnd() && this.testOr();}


DataListTest.prototype.testUncurry = function()
{
	var uncurriedPlus = uncurry(bPlus);
	return	uncurriedPlus([5, 7]) == 12 &&
		uncurriedPlus([3, 8]) == 11 ;
}

DataListTest.prototype.testFoldl = function()
{
	function tAndEven(p, x) {return p       && (x%2==0);}
	function tOrEven (s, x) {return s       || (x%2==0);}

	return	 foldl(tAndEven, true, []) &&
		!foldl(tAndEven, true, [3]) &&
		 foldl(tAndEven, true, [4]) &&
		!foldl(tAndEven, true, [3, 5]) &&
		!foldl(tAndEven, true, [3, 4]) &&
		!foldl(tAndEven, true, [4, 3]) &&
		 foldl(tAndEven, true, [4, 2]) &&
		!foldl(tAndEven, true, [3, 5,  7]) &&
		!foldl(tAndEven, true, [3, 5,  6]) &&
		!foldl(tAndEven, true, [3, 6,  7]) &&
		!foldl(tAndEven, true, [3, 6,  6]) &&
		!foldl(tAndEven, true, [2, 5,  7]) &&
		!foldl(tAndEven, true, [2, 5,  8]) &&
		!foldl(tAndEven, true, [2, 8,  7]) &&
		 foldl(tAndEven, true, [2, 8,  4]) ;
}

DataListTest.prototype.testEq = function()
{
	return	 eq(   1,    1) &&
		!eq(   1,    2) &&
		!eq(   1, null) &&
		 eq(null, null);
}


DataListTest.prototype.testVecEq = function()
{
	return	 vecEq([      ], [      ]) &&
		!vecEq([      ], [10    ]) &&
		!vecEq([      ], [10, 20]) &&
		!vecEq([10    ], [      ]) &&
		!vecEq([10, 20], [      ]) &&
		 vecEq([10    ], [10    ]) &&
		!vecEq([10    ], [20    ]) &&
		!vecEq([10    ], [10, 20]) &&
		!vecEq([10    ], [20, 10]) &&
		 vecEq([10, 20], [10, 20]) &&
		!vecEq([10, 20], [20, 10]) &&
		!vecEq([10, 10], [10    ]) &&
		!vecEq([10, 10], [20    ]) &&

		 vecEq({      }, {      }) &&
		!vecEq({a:null}, {      }) &&
		!vecEq({      }, {a:null}) &&
		 vecEq({a:null}, {a:null}) &&
		!vecEq({a:null}, {a:   1}) &&
		!vecEq({a:null}, {b:null}) ;
}

DataListTest.prototype.testIsPrefixOf = function()
{
	return	 isPrefixOf([      ], [      ]) &&
		 isPrefixOf([      ], [10    ]) &&
		 isPrefixOf([      ], [10, 20]) &&
		!isPrefixOf([10    ], [      ]) &&
		!isPrefixOf([10, 20], [      ]) &&
		 isPrefixOf([10    ], [10    ]) &&
		!isPrefixOf([10    ], [20    ]) &&
		 isPrefixOf([10    ], [10, 20]) &&
		!isPrefixOf([10    ], [20, 10]) &&
		 isPrefixOf([10, 20], [10, 20]) &&
		!isPrefixOf([10, 20], [20, 10]) &&
		!isPrefixOf([10, 10], [10    ]) &&
		!isPrefixOf([10, 10], [20    ]);
}

DataListTest.prototype.testDepth = function()
{
	return	depth(12  ) == 0 &&
		depth([  ]) == 1 && depth([12, 16]) == 1 &&
		depth([[]]) == 2 && depth([12, []]) == 2 && depth([[], 16]) == 2 && depth([12, [16]]) == 2 && depth([[12, 45], 4, [59, 8], 7]) == 2;
}


DataListTest.prototype.testSame = function()
{
	return   same([]) &&
		 same([false]) &&
		 same([true]) &&
		 same([false, false]) &&
		!same([false, true]) &&
		!same([true, false]) &&
		 same([true, true]) &&
		 same([false, false, false]) &&
		!same([false, false, true]) &&
		!same([false, true, false]) &&
		!same([false, true, true]) &&
		!same([true, false, false]) &&
		!same([true, false, true]) &&
		!same([true, true, false]) &&
		 same([true, true, true]);
}

DataListTest.prototype.testSum = function()
{
	return	sum([         ]) ==  0 &&
		sum([45       ]) == 45 &&
		sum([ 4, 7    ]) == 11 &&
		sum([ 5, 3, 12]) == 20;
}

DataListTest.prototype.testPointwise = function()
{
	return	vecEq(pointwise(bPlus)([2, 3, 5], [7, 11, 13]), [9, 14, 18]);
}

DataListTest.prototype.testAnd = function()
{
	return  lAnd([]) &&
		!lAnd([false]) &&
		 lAnd([true]) &&
		!lAnd([false, false]) &&
		!lAnd([false, true]) &&
		!lAnd([true, false]) &&
		 lAnd([true, true]) &&
		!lAnd([false, false, false]) &&
		!lAnd([false, false, true]) &&
		!lAnd([false, true, false]) &&
		!lAnd([false, true, true]) &&
		!lAnd([true, false, false]) &&
		!lAnd([true, false, true]) &&
		!lAnd([true, true, false]) &&
		 lAnd([true, true, true]);
}


DataListTest.prototype.testOr = function()
{
	return  !lOr([]) &&
		!lOr([false]) &&
		 lOr([true]) &&
		!lOr([false, false]) &&
		 lOr([false, true]) &&
		 lOr([true, false]) &&
		 lOr([true, true]) &&
		!lOr([false, false, false]) &&
		 lOr([false, false, true]) &&
		 lOr([false, true, false]) &&
		 lOr([false, true, true]) &&
		 lOr([true, false, false]) &&
		 lOr([true, false, true]) &&
		 lOr([true, true, false]) &&
		 lOr([true, true, true]);
}
