window.onload = main;

var graphicsHeader;
//const svgSingletonGlobals = new SvgSingletonGlobals(); // @TODO use it for setting parameters [600, 400], 10 (SVG width and height, and coordinate system transformation scale)

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
	SvgSingletonGlobals.reload(); // @TODO No need to predelete `canvas` and `svg` elements
}

const svgNS = 'http://www.w3.org/2000/svg';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';
function domainToSvg_600_400_10(dP) {return domainToSvgFactory([600, 400], 10)(dP);}
function svgToDomain_600_400_10(sP) {return svgToDomainFactory([600, 400], 10)(sP);}


function extendedTests(event)
{
	target = event.target.id;
	switch (true) { // @TODO credit to Nina Scholz, see [SO](https://stackoverflow.com/a/47281232)
		case /canvas_button/.test(target):
			SvgSingletonGlobals.renull();
			graphicsHeader.innerHTML = 'Canvas graphics';
			var canvas = createAndAppendChildWithAttrs(document.body, 'canvas', {id:'screen', width:1000, height:1000});
			setTimeout(testGraphics);
			break;
		case /svg_button/.test(target):
			SvgSingletonGlobals.renull();
			graphicsHeader.innerHTML = 'SVG graphics';
			SvgSingletonGlobals.reload();
			break;
		case /screen|fig_.*/.test(target):
			if (SvgSingletonGlobals.hasBeenSet()) {
				SvgSingletonGlobals.assimilateEventPosition(event);
			}
	}
}

function createGraphics(tagName, id, width, height, namespaceURI = null)
{
	var attrs = {id:id, width:width, height:height};
	return createElementWithAttributes(tagName, attrs, namespaceURI);
}


function testGraphics()
{
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	graphics(ctx,  0,  0, 8,  8, poly1_convex_ccw , 50,   0, 400, "rgb(200,   0, 0)");
	graphics(ctx, -4, -3, 8, 10, poly1_concave_ccw, 50, 500, 500, "rgb(160,  40, 0)");
	graphics(ctx, -3, -3, 3,  2, poly2_convex_ccw , 50, 100, 700, "rgb(  0, 200, 0)");
	graphics(ctx, -3, -3, 3,  2, poly2_degen_ccw  , 50, 350, 700, "rgb(  0, 160,40)");
	graphics(ctx, -3, -3, 3,  2, poly2_concave_ccw, 50, 600, 700, "rgb(  0, 120,80)");
}
