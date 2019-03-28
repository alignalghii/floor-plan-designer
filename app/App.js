function App()
{
	this.svgGraphics         = new SvgGraphics([1000, 600], 25, sampleFigureBank());  //  [600, 400] is SVG width and height, and 10 is the coordinate system transformation scale;
	this.html5canvasGraphics = new Html5canvasGraphics([1000, 1000]);                 // canvas only prepared
}

App.prototype.run = function (event)
{
	// Unit tests:
	this.runTests();
	// Event handlers
	var that = this;
	document.addEventListener('click'     , function (event) {that.clickHandler(event);}      ); // `(event) => this.clickHandler(event)`     is nicer but less portable
	document.addEventListener('mousemove' , function (event) {that.mousemoveHandler(event);}  ); // `(event) => this.mousemoveHandler(event)` is nicer but less portable
	// Dynamic graphics areas
	this.svgGraphics.render();                                        // svg gets rendered, too (canvas only prepared)
};


App.prototype.clickHandler = function (event)
{
	target = event.target.id;
	switch (true) { // @TODO credit to Nina Scholz, see [SO](https://stackoverflow.com/a/47281232)
		case /canvas_button/.test(target):
			this.svgGraphics.unrender();
			this.html5canvasGraphics.render();
			break;
		case /svg_button/.test(target):
			this.html5canvasGraphics.unrender();
			this.svgGraphics.render();
			break;
		case /screen/.test(target): this.svgGraphics.focusOff()        ; break;
		case /fig_.*/.test(target): this.svgGraphics.focusToggle(event); break;
	}
}

App.prototype.mousemoveHandler = function (event) {this.svgGraphics.assimilateEventPositionOnFocusIfAny(event);}

App.prototype.runTests = function ()
{
	/** Unit tests*/
	var status_math = testOr() && testAnd() && testPointwise() && testSum() && testSame() && testDet() && testScalarProduct() && testVectorLength() && testAngleOfVectors()  && testSignedRotAngleOfVectors() && testFromTo() && testAreConvexVectors() && testAreConcaveVectors() && testEdgeVector() && testAreConvexDirectedEdges() && testAreConcaveDirectedEdges() && testLineSide() && testSectionSide() && testIsPrefixOf() && testVecEq() && testEq() && testAngleOfEdges() && testTour() && testStatistics() && testAngleMod() && testIsConvex() && testAreConvex() && testRoll() && testRollToJoin() && testSubsequencer() && testSubsequencerRolled() && testDepth() && testExecuteTree() && testFoldl() && testUncurry() && testAngleTyper() && testAngleSumWhenToured() && testSignedRotAngleSumWhenToured() && testAngleTyper_dependent() && testAsciiGraphics() && testInside_convex_ccw() && testInside_convex_cw() && testInside_concave_ccw() && testInside_concave_cw() && testInside_series_convex_ccw() && testInside_series_convex_cw() && testInside_series_degen_ccw() && testInside_series_degen_cw() && testInside_series_concave_ccw() && testInside_series_concave_cw() && testCollidesTowards() && testCollides();
	var target_math = document.getElementById('result_math');
	target_math.innerHTML = status_math ? 'OK' : 'Wrong';

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
};


// @TODO obsolete, unused
function createGraphics(tagName, id, width, height, namespaceURI = null)
{
	var attrs = {id:id, width:width, height:height};
	return createElementWithAttributes(tagName, attrs, namespaceURI);
}
