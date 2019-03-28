var svgGraphics, html5canvasGraphics;
window.onload = main;

function main(event)
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

	/* Dynamic graphics areas */
	document.addEventListener('click'     , clickHandler    );
	document.addEventListener('mousemove' , mousemoveHandler);
	svgGraphics         = new SvgGraphics([1000, 600], 25, sampleFigureBank());       //  [600, 400] is SVG width and height, and 10 is the coordinate system transformation scale;
	svgGraphics.render();                                        // svg gets rendered, too
	html5canvasGraphics = new Html5canvasGraphics([1000, 1000]); // canvas only prepared
}


function clickHandler(event)
{
	target = event.target.id;
	switch (true) { // @TODO credit to Nina Scholz, see [SO](https://stackoverflow.com/a/47281232)
		case /canvas_button/.test(target):
			svgGraphics.unrender();
			html5canvasGraphics.render();
			break;
		case /svg_button/.test(target):
			html5canvasGraphics.unrender();
			svgGraphics.render();
			break;
		case /screen/.test(target): svgGraphics.focusOff()        ; break;
		case /fig_.*/.test(target): svgGraphics.focusToggle(event); break;
	}
}

function mousemoveHandler(event) {svgGraphics.assimilateEventPositionOnFocusIfAny(event);}

// @TODO obsolete, unused
function createGraphics(tagName, id, width, height, namespaceURI = null)
{
	var attrs = {id:id, width:width, height:height};
	return createElementWithAttributes(tagName, attrs, namespaceURI);
}
