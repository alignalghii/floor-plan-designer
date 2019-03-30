function TestSuite(OK = 0, all = 0)
{
	this.all = all;
	this.OK  = OK;
}

TestSuite.prototype.run = function ()
{
	/** Unit tests*/
	var status_math = testOr() && testAnd() && testPointwise() && testSum() && testSame() && testDet() && testScalarProduct() && testVectorLength() && testAngleOfVectors()  && testSignedRotAngleOfVectors() && testFromTo() && testAreConvexVectors() && testAreConcaveVectors() && testEdgeVector() && testAreConvexDirectedEdges() && testAreConcaveDirectedEdges() && testLineSide() && testSectionSide() && testIsPrefixOf() && testVecEq() && testEq() && testAngleOfEdges() && testTour() && testStatistics() && testAngleMod() && testIsConvex() && testAreConvex() && testRoll() && testRollToJoin() && testSubsequencer() && testSubsequencerRolled() && testDepth() && testExecuteTree() && testFoldl() && testUncurry() && testAngleTyper() && testAngleSumWhenToured() && testSignedRotAngleSumWhenToured() && testAngleTyper_dependent() && testAsciiGraphics() && testInside_convex_ccw() && testInside_convex_cw() && testInside_concave_ccw() && testInside_concave_cw() && testInside_series_convex_ccw() && testInside_series_convex_cw() && testInside_series_degen_ccw() && testInside_series_degen_cw() && testInside_series_concave_ccw() && testInside_series_concave_cw() && testCollidesTowards() && testCollides();
	var target_math = document.getElementById('result_math');
	target_math.innerHTML = status_math ? 'OK' : 'Wrong';
	this.count(status_math);

	var status_draw = true &&
		// Coordinate systems transition
		testDomainToSvgFactory() && testSvgToDomainFactory() &&
		// Drawing
		testStringifyPositionWithComma() && testPointsArgValue() &&
		// Board query
		testSelectByMax() && testSelectByProp() &&
		// Board algebra
		testFigureId() && testFigureNum() && testEmptyBoard() && testAddFigure() && testDeleteFigure() && testUpdateFigure() && testAppendLoadFrom() && testCollidesAny()
		// Geometric transformations (translation, reflection, rotation)
		testTranslation() && testDoTranslation() &&
		testFigureCollidesTowards() && testFigureCollides();

	var target_draw = document.getElementById('result_draw');
	target_draw.innerHTML = status_draw ? 'OK' : 'Wrong';
	this.count(status_draw);

	this.report();
};

TestSuite.prototype.count = function (flag)
{
	this.all++;
	if (flag) this.OK++;
}

TestSuite.prototype.report = function () {console.log('' + this.OK + '/' + this.all + '');}

