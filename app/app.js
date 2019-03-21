window.onload = main;

var graphicsHeader, svgSingletonGlobals;

function main(event)
{
	/** Unit tests*/
	var status_math = testOr() && testAnd() && testPointwise() && testSum() && testSame() && testDet() && testScalarProduct() && testVectorLength() && testAngleOfVectors()  && testSignedRotAngleOfVectors() && testFromTo() && testAreConvexVectors() && testAreConcaveVectors() && testEdgeVector() && testAreConvexDirectedEdges() && testAreConcaveDirectedEdges() && testLineSide() && testSectionSide() && testIsPrefixOf() && testVecEq() && testAngleOfEdges() && testTour() && testStatistics() && testAngleMod() && testIsConvex() && testAreConvex() && testRoll() && testRollToJoin() && testSubsequencer() && testSubsequencerRolled() && testDepth() && testExecuteTree() && testFoldl() && testUncurry() && testAngleTyper() && testAngleSumWhenToured() && testSignedRotAngleSumWhenToured() && testAngleTyper_dependent() && testAsciiGraphics() && testInside_convex_ccw() && testInside_convex_cw() && testInside_concave_ccw() && testInside_concave_cw() && testInside_series_convex_ccw() && testInside_series_convex_cw() && testInside_series_degen_ccw() && testInside_series_degen_cw() && testInside_series_concave_ccw() && testInside_series_concave_cw();
	var target_math = document.getElementById('result_math');
	target_math.innerHTML = status_math ? 'OK' : 'Wrong';

	var status_draw = true &&
		// Coordinate systems transition
		testDomainToSvgFactory() && testSvgToDomainFactory() &&
		// Drawing
		testStringifyPositionWithComma() && testDrawFigureAux() &&
		// Board query
		testSelectByMax() && testSelectByProp() &&
		// Board algebra
		testFigureId() && testFigureNum() && testEmptyBoard() && testAddFigure() && testDeleteFigure() && testUpdateFigure() &&
		// Geometric transformations (translation, reflection, rotation)
		testTranslation() && testDoTranslation();

	var target_draw = document.getElementById('result_draw');
	target_draw.innerHTML = status_draw ? 'OK' : 'Wrong';

	/* Dynamic graphics areas */
	document.addEventListener('click', extendedTests);
	graphicsHeader = document.getElementById('graphics_header');
	graphicsHeader.innerHTML = 'SVG graphics';
	svgSingletonGlobals = new SvgSingletonGlobals([600, 400], 10); // @TODO use it for setting parameters [600, 400], 10 (SVG width and height, and coordinate system transformation scale);
	svgSingletonGlobals.reload(); // @TODO No need to predelete `canvas` and `svg` elements
}


function extendedTests(event)
{
	target = event.target.id;
	switch (true) { // @TODO credit to Nina Scholz, see [SO](https://stackoverflow.com/a/47281232)
		case /canvas_button/.test(target):
			svgSingletonGlobals.renullAlsoVisually();
			graphicsHeader.innerHTML = 'Canvas graphics';
			var canvas = createAndAppendChildWithAttrs(document.body, 'canvas', {id:'screen', width:1000, height:1000});
			setTimeout(testGraphics);
			break;
		case /svg_button/.test(target):
			svgSingletonGlobals.renullAlsoVisually();
			graphicsHeader.innerHTML = 'SVG graphics';
			svgSingletonGlobals.reload();
			break;
		case /screen|fig_.*/.test(target):
			if (svgSingletonGlobals.hasBeenSet()) {
				svgSingletonGlobals.assimilateEventPosition(event);
			}
	}
}

// @TODO obsolete, unused
function createGraphics(tagName, id, width, height, namespaceURI = null)
{
	var attrs = {id:id, width:width, height:height};
	return createElementWithAttributes(tagName, attrs, namespaceURI);
}
