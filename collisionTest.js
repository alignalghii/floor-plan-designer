window.onload = main;

var graphicsHeader;
var svg = svgPoint = board = standingFig = movingFig = id_standing = id_moving = null; // set/unset always simultaneosly

function main(event)
{
	/** Unit tests*/
	var status_math = testOr() && testAnd() && testPointwise() && testSum() && testSame() && testDet() && testScalarProduct() && testVectorLength() && testAngleOfVectors()  && testSignedRotAngleOfVectors() && testAreConvexVectors() && testAreConcaveVectors() && testEdgeVector() && testAreConvexDirectedEdges() && testAreConcaveDirectedEdges() && testLineSide() && testSectionSide() && testIsPrefixOf() && testVecEq() && testAngleOfEdges() && testTour() && testStatistics() && testAngleMod() && testIsConvex() && testAreConvex() && testRoll() && testRollToJoin() && testSubsequencer() && testSubsequencerRolled() && testDepth() && testExecuteTree() && testFoldl() && testUncurry() && testAngleTyper() && testAngleSumWhenToured() && testSignedRotAngleSumWhenToured() && testAngleTyper_dependent() && testAsciiGraphics() && testInside_convex_ccw() && testInside_convex_cw() && testInside_concave_ccw() && testInside_concave_cw() && testInside_series_convex_ccw() && testInside_series_convex_cw() && testInside_series_degen_ccw() && testInside_series_degen_cw() && testInside_series_concave_ccw() && testInside_series_concave_cw();
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
	graphicsHeader = document.getElementById('graphics_header');
	document.addEventListener('click', extendedTests);
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
			destroyGraphics();
			graphicsHeader.innerHTML = 'Canvas graphics';
			var canvas = createAndAppendChildWithAttrs(document.body, 'canvas', {id:'screen', width:1000, height:1000});
			setTimeout(testGraphics);
			break;
		case /svg_button/.test(target):
			destroyGraphics();
			graphicsHeader.innerHTML = 'SVG graphics';
			svg         = createAndAppendChildWithAttrs(document.body, 'svg'   , {id:'screen', width:600,height:400}, svgNS);   // set/unset always simultaneosly
			svgPoint    = svg.createSVGPoint();                                                                                 // set/unset always simultaneosly
			//circle      = createAndAppendChildWithAttrs(svg          , 'circle', {cx:200, cy:200, r:80}             , svgNS); // set/unset always simultaneosly
			board       = emptyBoard;                                                                                           // set/unset always simultaneosly
			standingFig = new Figure([0, 0], [[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red' });                         // set/unset always simultaneosly
			movingFig   = new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'});                         // set/unset always simultaneosly
			/*@TODO procedural*/ id_standing = board.addFigure(standingFig);
			/*@TODO procedural*/ id_moving   = board.addFigure(movingFig  );
			redrawFigure(id_standing, board, domainToSvg_600_400_10, svg);
			redrawFigure(id_moving  , board, domainToSvg_600_400_10, svg);
			//svg.setAttributeNS(xmlns, 'xmlns'      , svgNS);
			//svg.setAttributeNS(xmlns, 'xmlns:xlink', xlink);
			break;
		case /screen|fig_.*/.test(target):
			if (svg && svgPoint) { // svg <-> svgPoint <-> ...
				svgPoint.x = event.clientX;
				svgPoint.y = event.clientY;
				var showPoint        = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
				var clickDomainPoint = svgToDomain_600_400_10([showPoint.x, showPoint.y]);
				var displacement     = fromTo(movingFig.grasp, clickDomainPoint);
				/*@TODO procedural*/movingFig.doTranslation(displacement);
				/*@TODO procedural*/board.updateFigure(id_moving, movingFig);
				redrawFigure(id_moving, board, domainToSvg_600_400_10, svg);
				//circle.setAttribute('cx', showPoint.x);
				//circle.setAttribute('cy', showPoint.y);
			}
	}
}

function destroyGraphics()
{
	deleteElementsWithTagNames(['canvas', 'svg']);
	svg = svgPoint = circle = board = standingFig = movingFig = id_standing = id_moving = null; // set/unset always simultaneosly
}


function deleteElementsWithTagNames(names) {names.forEach(deleteElementsWithTagName);}
function deleteElementsWithTagName(name)
{
	var elementCollection = document.getElementsByTagName(name);
	for (var i = 0; i < elementCollection.length; i++) {
		deleteElement(elementCollection.item(i));
	}
}

function deleteElement(element) {element.parentNode.removeChild(element);}

function createElementWithAttributes(tagName, attrs, namespaceURI = null)
{
	var element = namespaceURI ? document.createElementNS(namespaceURI, tagName)
	                           : document.createElement  (              tagName);
	for (var attrName in attrs) element.setAttribute(attrName, attrs[attrName]);
	return element;
}

function createAndAppendChildWithAttrs(parent, tagName, attrs, namespaceURI = null)
{
	var childElement = createElementWithAttributes(tagName, attrs, namespaceURI);
	parent.appendChild(childElement);
	return childElement;
}


function createGraphics(tagName, id, width, height, namespaceURI = null)
{
	var attrs = {id:id, width:width, height:height};
	return createElementWithAttributes(tagName, attrs, namespaceURI);
}

function insertAfter(what, afterWhat) {afterWhat.parentNode.insertBefore(what, afterWhat.nextSibling);}

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


const poly1_convex_ccw = [[2, 1], [6, 2], [7, 5], [5, 7], [1, 6]];
const poly1_convex_cw  = [[2, 1], [1, 6], [5, 7], [7, 5], [6, 2]];

const poly1_concave_ccw = [[ 4, -1], [ 7,  2], [ 5,  2], [ 4,  4], [ 5,  7], [ 3,  9], [ 3,  3], [-3,  5], [-3,  2], [-1,  1], [-2,  -2]];
const poly1_concave_cw  = [[ 4, -1], [-2, -2], [-1,  1], [-3,  2], [-3,  5], [ 3,  3], [ 3,  9], [ 5,  7], [ 4,  4], [ 5,  2], [ 7,  2]];

const poly2_convex_ccw  = [[ 0, -2], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_convex_cw   = [[ 0, -2], [-2, -1], [ 0,  1], [ 2, -1]];
const poly2_degen_ccw   = [[ 0, -1], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_degen_cw    = [[ 0, -1], [-2, -1], [ 0,  1], [ 2, -1]];
const poly2_concave_ccw = [[ 0,  0], [ 2, -1], [ 0,  1], [-2, -1]];
const poly2_concave_cw  = [[ 0,  0], [-2, -1], [ 0,  1], [ 2, -1]];



function testAsciiGraphics()
{
	return asciiGraphics(0, 0, 8, 8, poly1_convex_ccw) == ".........\n" +
	                                                      ".....#...\n" +
	                                                      ".######..\n" +
	                                                      "..######.\n" +
	                                                      "..#####..\n" +
	                                                      "..#####..\n" +
	                                                      "..#####..\n" +
	                                                      "..#......\n" +
	                                                      ".........\n" ;
}


function testInside_series_convex_ccw()
{
	return	!inside([ -3,  -3], poly2_convex_ccw) &&
		!inside([ -2,  -3], poly2_convex_ccw) &&
		!inside([ -1,  -3], poly2_convex_ccw) &&
		!inside([  0,  -3], poly2_convex_ccw) &&
		!inside([  1,  -3], poly2_convex_ccw) &&
		!inside([  2,  -3], poly2_convex_ccw) &&
		!inside([  3,  -3], poly2_convex_ccw) &&

		!inside([ -3,  -2], poly2_convex_ccw) &&
		!inside([ -2,  -2], poly2_convex_ccw) &&
		!inside([ -1,  -2], poly2_convex_ccw) &&
		 inside([  0,  -2], poly2_convex_ccw) &&
		!inside([  1,  -2], poly2_convex_ccw) &&
		!inside([  2,  -2], poly2_convex_ccw) &&
		!inside([  3,  -2], poly2_convex_ccw) &&

		!inside([ -3,  -1], poly2_convex_ccw) &&
		 inside([ -2,  -1], poly2_convex_ccw) &&
		 inside([ -1,  -1], poly2_convex_ccw) &&
		 inside([  0,  -1], poly2_convex_ccw) &&
		 inside([  1,  -1], poly2_convex_ccw) &&
		 inside([  2,  -1], poly2_convex_ccw) &&
		!inside([  3,  -1], poly2_convex_ccw) &&

		!inside([ -3,   0], poly2_convex_ccw) &&
		!inside([ -2,   0], poly2_convex_ccw) &&
		 inside([ -1,   0], poly2_convex_ccw) &&
		 inside([  0,   0], poly2_convex_ccw) &&
		 inside([  1,   0], poly2_convex_ccw) &&
		!inside([  2,   0], poly2_convex_ccw) &&
		!inside([  3,   0], poly2_convex_ccw) &&

		!inside([ -3,   1], poly2_convex_ccw) &&
		!inside([ -2,   1], poly2_convex_ccw) &&
		!inside([ -1,   1], poly2_convex_ccw) &&
		 inside([  0,   1], poly2_convex_ccw) &&
		!inside([  1,   1], poly2_convex_ccw) &&
		!inside([  2,   1], poly2_convex_ccw) &&
		!inside([  3,   1], poly2_convex_ccw) &&

		!inside([ -3,   2], poly2_convex_ccw) &&
		!inside([ -2,   2], poly2_convex_ccw) &&
		!inside([ -1,   2], poly2_convex_ccw) &&
		!inside([  0,   2], poly2_convex_ccw) &&
		!inside([  1,   2], poly2_convex_ccw) &&
		!inside([  2,   2], poly2_convex_ccw) &&
		!inside([  3,   2], poly2_convex_ccw) ;
}


function testInside_series_convex_cw()
{
	return	!inside([ -3,  -3], poly2_convex_cw) &&
		!inside([ -2,  -3], poly2_convex_cw) &&
		!inside([ -1,  -3], poly2_convex_cw) &&
		!inside([  0,  -3], poly2_convex_cw) &&
		!inside([  1,  -3], poly2_convex_cw) &&
		!inside([  2,  -3], poly2_convex_cw) &&
		!inside([  3,  -3], poly2_convex_cw) &&

		!inside([ -3,  -2], poly2_convex_cw) &&
		!inside([ -2,  -2], poly2_convex_cw) &&
		!inside([ -1,  -2], poly2_convex_cw) &&
		 inside([  0,  -2], poly2_convex_cw) &&
		!inside([  1,  -2], poly2_convex_cw) &&
		!inside([  2,  -2], poly2_convex_cw) &&
		!inside([  3,  -2], poly2_convex_cw) &&

		!inside([ -3,  -1], poly2_convex_cw) &&
		 inside([ -2,  -1], poly2_convex_cw) &&
		 inside([ -1,  -1], poly2_convex_cw) &&
		 inside([  0,  -1], poly2_convex_cw) &&
		 inside([  1,  -1], poly2_convex_cw) &&
		 inside([  2,  -1], poly2_convex_cw) &&
		!inside([  3,  -1], poly2_convex_cw) &&

		!inside([ -3,   0], poly2_convex_cw) &&
		!inside([ -2,   0], poly2_convex_cw) &&
		 inside([ -1,   0], poly2_convex_cw) &&
		 inside([  0,   0], poly2_convex_cw) &&
		 inside([  1,   0], poly2_convex_cw) &&
		!inside([  2,   0], poly2_convex_cw) &&
		!inside([  3,   0], poly2_convex_cw) &&

		!inside([ -3,   1], poly2_convex_cw) &&
		!inside([ -2,   1], poly2_convex_cw) &&
		!inside([ -1,   1], poly2_convex_cw) &&
		 inside([  0,   1], poly2_convex_cw) &&
		!inside([  1,   1], poly2_convex_cw) &&
		!inside([  2,   1], poly2_convex_cw) &&
		!inside([  3,   1], poly2_convex_cw) &&

		!inside([ -3,   2], poly2_convex_cw) &&
		!inside([ -2,   2], poly2_convex_cw) &&
		!inside([ -1,   2], poly2_convex_cw) &&
		!inside([  0,   2], poly2_convex_cw) &&
		!inside([  1,   2], poly2_convex_cw) &&
		!inside([  2,   2], poly2_convex_cw) &&
		!inside([  3,   2], poly2_convex_cw) ;
}


function testInside_series_degen_ccw()
{
	return	!inside([ -3,  -3], poly2_degen_ccw) &&
		!inside([ -2,  -3], poly2_degen_ccw) &&
		!inside([ -1,  -3], poly2_degen_ccw) &&
		!inside([  0,  -3], poly2_degen_ccw) &&
		!inside([  1,  -3], poly2_degen_ccw) &&
		!inside([  2,  -3], poly2_degen_ccw) &&
		!inside([  3,  -3], poly2_degen_ccw) &&

		!inside([ -3,  -2], poly2_degen_ccw) &&
		!inside([ -2,  -2], poly2_degen_ccw) &&
		!inside([ -1,  -2], poly2_degen_ccw) &&
		!inside([  0,  -2], poly2_degen_ccw) &&
		!inside([  1,  -2], poly2_degen_ccw) &&
		!inside([  2,  -2], poly2_degen_ccw) &&
		!inside([  3,  -2], poly2_degen_ccw) &&

		!inside([ -3,  -1], poly2_degen_ccw) &&
		 inside([ -2,  -1], poly2_degen_ccw) &&
		 inside([ -1,  -1], poly2_degen_ccw) &&
		 inside([  0,  -1], poly2_degen_ccw) &&
		 inside([  1,  -1], poly2_degen_ccw) &&
		 inside([  2,  -1], poly2_degen_ccw) &&
		!inside([  3,  -1], poly2_degen_ccw) &&

		!inside([ -3,   0], poly2_degen_ccw) &&
		!inside([ -2,   0], poly2_degen_ccw) &&
		 inside([ -1,   0], poly2_degen_ccw) &&
		 inside([  0,   0], poly2_degen_ccw) &&
		 inside([  1,   0], poly2_degen_ccw) &&
		!inside([  2,   0], poly2_degen_ccw) &&
		!inside([  3,   0], poly2_degen_ccw) &&

		!inside([ -3,   1], poly2_degen_ccw) &&
		!inside([ -2,   1], poly2_degen_ccw) &&
		!inside([ -1,   1], poly2_degen_ccw) &&
		 inside([  0,   1], poly2_degen_ccw) &&
		!inside([  1,   1], poly2_degen_ccw) &&
		!inside([  2,   1], poly2_degen_ccw) &&
		!inside([  3,   1], poly2_degen_ccw) &&

		!inside([ -3,   2], poly2_degen_ccw) &&
		!inside([ -2,   2], poly2_degen_ccw) &&
		!inside([ -1,   2], poly2_degen_ccw) &&
		!inside([  0,   2], poly2_degen_ccw) &&
		!inside([  1,   2], poly2_degen_ccw) &&
		!inside([  2,   2], poly2_degen_ccw) &&
		!inside([  3,   2], poly2_degen_ccw) ;
}

function testInside_series_degen_cw()
{
	return	!inside([ -3,  -3], poly2_degen_cw) &&
		!inside([ -2,  -3], poly2_degen_cw) &&
		!inside([ -1,  -3], poly2_degen_cw) &&
		!inside([  0,  -3], poly2_degen_cw) &&
		!inside([  1,  -3], poly2_degen_cw) &&
		!inside([  2,  -3], poly2_degen_cw) &&
		!inside([  3,  -3], poly2_degen_cw) &&

		!inside([ -3,  -2], poly2_degen_cw) &&
		!inside([ -2,  -2], poly2_degen_cw) &&
		!inside([ -1,  -2], poly2_degen_cw) &&
		!inside([  0,  -2], poly2_degen_cw) &&
		!inside([  1,  -2], poly2_degen_cw) &&
		!inside([  2,  -2], poly2_degen_cw) &&
		!inside([  3,  -2], poly2_degen_cw) &&

		!inside([ -3,  -1], poly2_degen_cw) &&
		 inside([ -2,  -1], poly2_degen_cw) &&
		 inside([ -1,  -1], poly2_degen_cw) &&
		 inside([  0,  -1], poly2_degen_cw) &&
		 inside([  1,  -1], poly2_degen_cw) &&
		 inside([  2,  -1], poly2_degen_cw) &&
		!inside([  3,  -1], poly2_degen_cw) &&

		!inside([ -3,   0], poly2_degen_cw) &&
		!inside([ -2,   0], poly2_degen_cw) &&
		 inside([ -1,   0], poly2_degen_cw) &&
		 inside([  0,   0], poly2_degen_cw) &&
		 inside([  1,   0], poly2_degen_cw) &&
		!inside([  2,   0], poly2_degen_cw) &&
		!inside([  3,   0], poly2_degen_cw) &&

		!inside([ -3,   1], poly2_degen_cw) &&
		!inside([ -2,   1], poly2_degen_cw) &&
		!inside([ -1,   1], poly2_degen_cw) &&
		 inside([  0,   1], poly2_degen_cw) &&
		!inside([  1,   1], poly2_degen_cw) &&
		!inside([  2,   1], poly2_degen_cw) &&
		!inside([  3,   1], poly2_degen_cw) &&

		!inside([ -3,   2], poly2_degen_cw) &&
		!inside([ -2,   2], poly2_degen_cw) &&
		!inside([ -1,   2], poly2_degen_cw) &&
		!inside([  0,   2], poly2_degen_cw) &&
		!inside([  1,   2], poly2_degen_cw) &&
		!inside([  2,   2], poly2_degen_cw) &&
		!inside([  3,   2], poly2_degen_cw) ;
}


function testInside_series_concave_ccw()
{
	return	!inside([ -3,  -3], poly2_concave_ccw) &&
		!inside([ -2,  -3], poly2_concave_ccw) &&
		!inside([ -1,  -3], poly2_concave_ccw) &&
		!inside([  0,  -3], poly2_concave_ccw) &&
		!inside([  1,  -3], poly2_concave_ccw) &&
		!inside([  2,  -3], poly2_concave_ccw) &&
		!inside([  3,  -3], poly2_concave_ccw) &&

		!inside([ -3,  -2], poly2_concave_ccw) &&
		!inside([ -2,  -2], poly2_concave_ccw) &&
		!inside([ -1,  -2], poly2_concave_ccw) &&
		!inside([  0,  -2], poly2_concave_ccw) &&
		!inside([  1,  -2], poly2_concave_ccw) &&
		!inside([  2,  -2], poly2_concave_ccw) &&
		!inside([  3,  -2], poly2_concave_ccw) &&

		!inside([ -3,  -1], poly2_concave_ccw) &&
		 inside([ -2,  -1], poly2_concave_ccw) &&
		!inside([ -1,  -1], poly2_concave_ccw) &&
		!inside([  0,  -1], poly2_concave_ccw) &&
		!inside([  1,  -1], poly2_concave_ccw) &&
		 inside([  2,  -1], poly2_concave_ccw) &&
		!inside([  3,  -1], poly2_concave_ccw) &&

		!inside([ -3,   0], poly2_concave_ccw) &&
		!inside([ -2,   0], poly2_concave_ccw) &&
		 inside([ -1,   0], poly2_concave_ccw) &&
		 inside([  0,   0], poly2_concave_ccw) &&
		 inside([  1,   0], poly2_concave_ccw) &&
		!inside([  2,   0], poly2_concave_ccw) &&
		!inside([  3,   0], poly2_concave_ccw) &&

		!inside([ -3,   1], poly2_concave_ccw) &&
		!inside([ -2,   1], poly2_concave_ccw) &&
		!inside([ -1,   1], poly2_concave_ccw) &&
		 inside([  0,   1], poly2_concave_ccw) &&
		!inside([  1,   1], poly2_concave_ccw) &&
		!inside([  2,   1], poly2_concave_ccw) &&
		!inside([  3,   1], poly2_concave_ccw) &&

		!inside([ -3,   2], poly2_concave_ccw) &&
		!inside([ -2,   2], poly2_concave_ccw) &&
		!inside([ -1,   2], poly2_concave_ccw) &&
		!inside([  0,   2], poly2_concave_ccw) &&
		!inside([  1,   2], poly2_concave_ccw) &&
		!inside([  2,   2], poly2_concave_ccw) &&
		!inside([  3,   2], poly2_concave_ccw) ;
}


function testInside_series_concave_cw()
{
	return	!inside([ -3,  -3], poly2_concave_cw) &&
		!inside([ -2,  -3], poly2_concave_cw) &&
		!inside([ -1,  -3], poly2_concave_cw) &&
		!inside([  0,  -3], poly2_concave_cw) &&
		!inside([  1,  -3], poly2_concave_cw) &&
		!inside([  2,  -3], poly2_concave_cw) &&
		!inside([  3,  -3], poly2_concave_cw) &&

		!inside([ -3,  -2], poly2_concave_cw) &&
		!inside([ -2,  -2], poly2_concave_cw) &&
		!inside([ -1,  -2], poly2_concave_cw) &&
		!inside([  0,  -2], poly2_concave_cw) &&
		!inside([  1,  -2], poly2_concave_cw) &&
		!inside([  2,  -2], poly2_concave_cw) &&
		!inside([  3,  -2], poly2_concave_cw) &&

		!inside([ -3,  -1], poly2_concave_cw) &&
		 inside([ -2,  -1], poly2_concave_cw) &&
		!inside([ -1,  -1], poly2_concave_cw) &&
		!inside([  0,  -1], poly2_concave_cw) &&
		!inside([  1,  -1], poly2_concave_cw) &&
		 inside([  2,  -1], poly2_concave_cw) &&
		!inside([  3,  -1], poly2_concave_cw) &&

		!inside([ -3,   0], poly2_concave_cw) &&
		!inside([ -2,   0], poly2_concave_cw) &&
		 inside([ -1,   0], poly2_concave_cw) &&
		 inside([  0,   0], poly2_concave_cw) &&
		 inside([  1,   0], poly2_concave_cw) &&
		!inside([  2,   0], poly2_concave_cw) &&
		!inside([  3,   0], poly2_concave_cw) &&

		!inside([ -3,   1], poly2_concave_cw) &&
		!inside([ -2,   1], poly2_concave_cw) &&
		!inside([ -1,   1], poly2_concave_cw) &&
		 inside([  0,   1], poly2_concave_cw) &&
		!inside([  1,   1], poly2_concave_cw) &&
		!inside([  2,   1], poly2_concave_cw) &&
		!inside([  3,   1], poly2_concave_cw) &&

		!inside([ -3,   2], poly2_concave_cw) &&
		!inside([ -2,   2], poly2_concave_cw) &&
		!inside([ -1,   2], poly2_concave_cw) &&
		!inside([  0,   2], poly2_concave_cw) &&
		!inside([  1,   2], poly2_concave_cw) &&
		!inside([  2,   2], poly2_concave_cw) &&
		!inside([  3,   2], poly2_concave_cw) ;
}


function testInside_convex_ccw()
{
	return  !inside([0, 0], poly1_convex_ccw) &&
		!inside([1, 0], poly1_convex_ccw) &&
		!inside([2, 0], poly1_convex_ccw) &&
		!inside([3, 0], poly1_convex_ccw) &&
		!inside([4, 0], poly1_convex_ccw) &&
		!inside([5, 0], poly1_convex_ccw) &&
		!inside([6, 0], poly1_convex_ccw) &&
		!inside([7, 0], poly1_convex_ccw) &&
		!inside([8, 0], poly1_convex_ccw) &&

		!inside([0, 1], poly1_convex_ccw) &&
		!inside([1, 1], poly1_convex_ccw) &&
		 inside([2, 1], poly1_convex_ccw) &&
		!inside([3, 1], poly1_convex_ccw) &&
		!inside([4, 1], poly1_convex_ccw) &&
		!inside([5, 1], poly1_convex_ccw) &&
		!inside([6, 1], poly1_convex_ccw) &&
		!inside([7, 1], poly1_convex_ccw) &&
		!inside([8, 1], poly1_convex_ccw) &&

		!inside([0, 2], poly1_convex_ccw) &&
		!inside([1, 2], poly1_convex_ccw) &&
		 inside([2, 2], poly1_convex_ccw) &&
		 inside([3, 2], poly1_convex_ccw) &&
		 inside([4, 2], poly1_convex_ccw) &&
		 inside([5, 2], poly1_convex_ccw) &&
		 inside([6, 2], poly1_convex_ccw) &&
		!inside([7, 2], poly1_convex_ccw) &&
		!inside([8, 2], poly1_convex_ccw) &&

		!inside([0, 3], poly1_convex_ccw) &&
		!inside([1, 3], poly1_convex_ccw) &&
		 inside([2, 3], poly1_convex_ccw) &&
		 inside([3, 3], poly1_convex_ccw) &&
		 inside([4, 3], poly1_convex_ccw) &&
		 inside([5, 3], poly1_convex_ccw) &&
		 inside([6, 3], poly1_convex_ccw) &&
		!inside([7, 3], poly1_convex_ccw) &&
		!inside([8, 3], poly1_convex_ccw) &&

		!inside([0, 4], poly1_convex_ccw) &&
		!inside([1, 4], poly1_convex_ccw) &&
		 inside([2, 4], poly1_convex_ccw) &&
		 inside([3, 4], poly1_convex_ccw) &&
		 inside([4, 4], poly1_convex_ccw) &&
		 inside([5, 4], poly1_convex_ccw) &&
		 inside([6, 4], poly1_convex_ccw) &&
		!inside([7, 4], poly1_convex_ccw) &&
		!inside([8, 4], poly1_convex_ccw) &&

		!inside([0, 5], poly1_convex_ccw) &&
		!inside([1, 5], poly1_convex_ccw) &&
		 inside([2, 5], poly1_convex_ccw) &&
		 inside([3, 5], poly1_convex_ccw) &&
		 inside([4, 5], poly1_convex_ccw) &&
		 inside([5, 5], poly1_convex_ccw) &&
		 inside([6, 5], poly1_convex_ccw) &&
		 inside([7, 5], poly1_convex_ccw) &&
		!inside([8, 5], poly1_convex_ccw) &&

		!inside([0, 6], poly1_convex_ccw) &&
		 inside([1, 6], poly1_convex_ccw) &&
		 inside([2, 6], poly1_convex_ccw) &&
		 inside([3, 6], poly1_convex_ccw) &&
		 inside([4, 6], poly1_convex_ccw) &&
		 inside([5, 6], poly1_convex_ccw) &&
		 inside([6, 6], poly1_convex_ccw) &&
		!inside([7, 6], poly1_convex_ccw) &&
		!inside([8, 6], poly1_convex_ccw) &&

		!inside([0, 7], poly1_convex_ccw) &&
		!inside([1, 7], poly1_convex_ccw) &&
		!inside([2, 7], poly1_convex_ccw) &&
		!inside([3, 7], poly1_convex_ccw) &&
		!inside([4, 7], poly1_convex_ccw) &&
		 inside([5, 7], poly1_convex_ccw) &&
		!inside([6, 7], poly1_convex_ccw) &&
		!inside([7, 7], poly1_convex_ccw) &&
		!inside([8, 7], poly1_convex_ccw) &&

		!inside([0, 8], poly1_convex_ccw) &&
		!inside([1, 8], poly1_convex_ccw) &&
		!inside([2, 8], poly1_convex_ccw) &&
		!inside([3, 8], poly1_convex_ccw) &&
		!inside([4, 8], poly1_convex_ccw) &&
		!inside([5, 8], poly1_convex_ccw) &&
		!inside([6, 8], poly1_convex_ccw) &&
		!inside([7, 8], poly1_convex_ccw) &&
		!inside([8, 8], poly1_convex_ccw);
}

function testInside_convex_cw()
{
	return  !inside([0, 0], poly1_convex_cw) &&
		!inside([1, 0], poly1_convex_cw) &&
		!inside([2, 0], poly1_convex_cw) &&
		!inside([3, 0], poly1_convex_cw) &&
		!inside([4, 0], poly1_convex_cw) &&
		!inside([5, 0], poly1_convex_cw) &&
		!inside([6, 0], poly1_convex_cw) &&
		!inside([7, 0], poly1_convex_cw) &&
		!inside([8, 0], poly1_convex_cw) &&

		!inside([0, 1], poly1_convex_cw) &&
		!inside([1, 1], poly1_convex_cw) &&
		 inside([2, 1], poly1_convex_cw) &&
		!inside([3, 1], poly1_convex_cw) &&
		!inside([4, 1], poly1_convex_cw) &&
		!inside([5, 1], poly1_convex_cw) &&
		!inside([6, 1], poly1_convex_cw) &&
		!inside([7, 1], poly1_convex_cw) &&
		!inside([8, 1], poly1_convex_cw) &&

		!inside([0, 2], poly1_convex_cw) &&
		!inside([1, 2], poly1_convex_cw) &&
		 inside([2, 2], poly1_convex_cw) &&
		 inside([3, 2], poly1_convex_cw) &&
		 inside([4, 2], poly1_convex_cw) &&
		 inside([5, 2], poly1_convex_cw) &&
		 inside([6, 2], poly1_convex_cw) &&
		!inside([7, 2], poly1_convex_cw) &&
		!inside([8, 2], poly1_convex_cw) &&

		!inside([0, 3], poly1_convex_cw) &&
		!inside([1, 3], poly1_convex_cw) &&
		 inside([2, 3], poly1_convex_cw) &&
		 inside([3, 3], poly1_convex_cw) &&
		 inside([4, 3], poly1_convex_cw) &&
		 inside([5, 3], poly1_convex_cw) &&
		 inside([6, 3], poly1_convex_cw) &&
		!inside([7, 3], poly1_convex_cw) &&
		!inside([8, 3], poly1_convex_cw) &&

		!inside([0, 4], poly1_convex_cw) &&
		!inside([1, 4], poly1_convex_cw) &&
		 inside([2, 4], poly1_convex_cw) &&
		 inside([3, 4], poly1_convex_cw) &&
		 inside([4, 4], poly1_convex_cw) &&
		 inside([5, 4], poly1_convex_cw) &&
		 inside([6, 4], poly1_convex_cw) &&
		!inside([7, 4], poly1_convex_cw) &&
		!inside([8, 4], poly1_convex_cw) &&

		!inside([0, 5], poly1_convex_cw) &&
		!inside([1, 5], poly1_convex_cw) &&
		 inside([2, 5], poly1_convex_cw) &&
		 inside([3, 5], poly1_convex_cw) &&
		 inside([4, 5], poly1_convex_cw) &&
		 inside([5, 5], poly1_convex_cw) &&
		 inside([6, 5], poly1_convex_cw) &&
		 inside([7, 5], poly1_convex_cw) &&
		!inside([8, 5], poly1_convex_cw) &&

		!inside([0, 6], poly1_convex_cw) &&
		 inside([1, 6], poly1_convex_cw) &&
		 inside([2, 6], poly1_convex_cw) &&
		 inside([3, 6], poly1_convex_cw) &&
		 inside([4, 6], poly1_convex_cw) &&
		 inside([5, 6], poly1_convex_cw) &&
		 inside([6, 6], poly1_convex_cw) &&
		!inside([7, 6], poly1_convex_cw) &&
		!inside([8, 6], poly1_convex_cw) &&

		!inside([0, 7], poly1_convex_cw) &&
		!inside([1, 7], poly1_convex_cw) &&
		!inside([2, 7], poly1_convex_cw) &&
		!inside([3, 7], poly1_convex_cw) &&
		!inside([4, 7], poly1_convex_cw) &&
		 inside([5, 7], poly1_convex_cw) &&
		!inside([6, 7], poly1_convex_cw) &&
		!inside([7, 7], poly1_convex_cw) &&
		!inside([8, 7], poly1_convex_cw) &&

		!inside([0, 8], poly1_convex_cw) &&
		!inside([1, 8], poly1_convex_cw) &&
		!inside([2, 8], poly1_convex_cw) &&
		!inside([3, 8], poly1_convex_cw) &&
		!inside([4, 8], poly1_convex_cw) &&
		!inside([5, 8], poly1_convex_cw) &&
		!inside([6, 8], poly1_convex_cw) &&
		!inside([7, 8], poly1_convex_cw) &&
		!inside([8, 8], poly1_convex_cw) ;
}

function testInside_concave_ccw()
{
	return	!inside([ -4,  -3], poly1_concave_ccw) &&
		!inside([ -3,  -3], poly1_concave_ccw) &&
		!inside([ -2,  -3], poly1_concave_ccw) &&
		!inside([ -1,  -3], poly1_concave_ccw) &&
		!inside([  0,  -3], poly1_concave_ccw) &&
		!inside([  1,  -3], poly1_concave_ccw) &&
		!inside([  2,  -3], poly1_concave_ccw) &&
		!inside([  3,  -3], poly1_concave_ccw) &&
		!inside([  4,  -3], poly1_concave_ccw) &&
		!inside([  5,  -3], poly1_concave_ccw) &&
		!inside([  6,  -3], poly1_concave_ccw) &&
		!inside([  7,  -3], poly1_concave_ccw) &&
		!inside([  8,  -3], poly1_concave_ccw) &&

		!inside([ -4,  -2], poly1_concave_ccw) &&
		!inside([ -3,  -2], poly1_concave_ccw) &&
		 inside([ -1,  -1], poly1_concave_ccw) &&
		!inside([ -1,  -2], poly1_concave_ccw) &&
		!inside([  0,  -2], poly1_concave_ccw) &&
		!inside([  1,  -2], poly1_concave_ccw) &&
		!inside([  2,  -2], poly1_concave_ccw) &&
		!inside([  3,  -2], poly1_concave_ccw) &&
		!inside([  4,  -2], poly1_concave_ccw) &&
		!inside([  5,  -2], poly1_concave_ccw) &&
		!inside([  6,  -2], poly1_concave_ccw) &&
		!inside([  7,  -2], poly1_concave_ccw) &&
		!inside([  8,  -2], poly1_concave_ccw) &&

		!inside([ -4,  -1], poly1_concave_ccw) &&
		!inside([ -3,  -1], poly1_concave_ccw) &&
		!inside([ -2,  -1], poly1_concave_ccw) &&
		 inside([ -1,  -1], poly1_concave_ccw) &&
		 inside([  0,  -1], poly1_concave_ccw) &&
		 inside([  1,  -1], poly1_concave_ccw) &&
		 inside([  2,  -1], poly1_concave_ccw) &&
		 inside([  3,  -1], poly1_concave_ccw) &&
		 inside([  4,  -1], poly1_concave_ccw) &&
		!inside([  5,  -1], poly1_concave_ccw) &&
		!inside([  6,  -1], poly1_concave_ccw) &&
		!inside([  7,  -1], poly1_concave_ccw) &&
		!inside([  8,  -1], poly1_concave_ccw) &&

		!inside([ -4,   0], poly1_concave_ccw) &&
		!inside([ -3,   0], poly1_concave_ccw) &&
		!inside([ -2,   0], poly1_concave_ccw) &&
		 inside([ -1,   0], poly1_concave_ccw) &&
		 inside([  0,   0], poly1_concave_ccw) &&
		 inside([  1,   0], poly1_concave_ccw) &&
		 inside([  2,   0], poly1_concave_ccw) &&
		 inside([  3,   0], poly1_concave_ccw) &&
		 inside([  4,   0], poly1_concave_ccw) &&
		 inside([  5,   0], poly1_concave_ccw) &&
		!inside([  6,   0], poly1_concave_ccw) &&
		!inside([  7,   0], poly1_concave_ccw) &&
		!inside([  8,   0], poly1_concave_ccw) &&

		!inside([ -4,   1], poly1_concave_ccw) &&
		!inside([ -3,   1], poly1_concave_ccw) &&
		!inside([ -2,   1], poly1_concave_ccw) &&
		 inside([ -1,   1], poly1_concave_ccw) &&
		 inside([  0,   1], poly1_concave_ccw) &&
		 inside([  1,   1], poly1_concave_ccw) &&
		 inside([  2,   1], poly1_concave_ccw) &&
		 inside([  3,   1], poly1_concave_ccw) &&
		 inside([  4,   1], poly1_concave_ccw) &&
		 inside([  5,   1], poly1_concave_ccw) &&
		 inside([  6,   1], poly1_concave_ccw) &&
		!inside([  7,   1], poly1_concave_ccw) &&
		!inside([  8,   1], poly1_concave_ccw) &&

		!inside([ -4,   2], poly1_concave_ccw) &&
		 inside([ -3,   2], poly1_concave_ccw) &&
		 inside([ -2,   2], poly1_concave_ccw) &&
		 inside([ -1,   2], poly1_concave_ccw) &&
		 inside([  0,   2], poly1_concave_ccw) &&
		 inside([  1,   2], poly1_concave_ccw) &&
		 inside([  2,   2], poly1_concave_ccw) &&
		 inside([  3,   2], poly1_concave_ccw) &&
		 inside([  4,   2], poly1_concave_ccw) &&
		 inside([  5,   2], poly1_concave_ccw) &&
		 inside([  6,   2], poly1_concave_ccw) &&
		 inside([  7,   2], poly1_concave_ccw) &&
		!inside([  8,   2], poly1_concave_ccw) &&

		!inside([ -4,   3], poly1_concave_ccw) &&
		 inside([ -3,   3], poly1_concave_ccw) &&
		 inside([ -2,   3], poly1_concave_ccw) &&
		 inside([ -1,   3], poly1_concave_ccw) &&
		 inside([  0,   3], poly1_concave_ccw) &&
		 inside([  1,   3], poly1_concave_ccw) &&
		 inside([  2,   3], poly1_concave_ccw) &&
		 inside([  3,   3], poly1_concave_ccw) &&
		 inside([  4,   3], poly1_concave_ccw) &&
		!inside([  5,   3], poly1_concave_ccw) &&
		!inside([  6,   3], poly1_concave_ccw) &&
		!inside([  7,   3], poly1_concave_ccw) &&
		!inside([  8,   3], poly1_concave_ccw) &&

		!inside([ -4,   4], poly1_concave_ccw) &&
		 inside([ -3,   4], poly1_concave_ccw) &&
		 inside([ -2,   4], poly1_concave_ccw) &&
		 inside([ -1,   4], poly1_concave_ccw) &&
		 inside([  0,   4], poly1_concave_ccw) &&
		!inside([  1,   4], poly1_concave_ccw) &&
		!inside([  2,   4], poly1_concave_ccw) &&
		 inside([  3,   4], poly1_concave_ccw) &&
		 inside([  4,   4], poly1_concave_ccw) &&
		!inside([  5,   4], poly1_concave_ccw) &&
		!inside([  6,   4], poly1_concave_ccw) &&
		!inside([  7,   4], poly1_concave_ccw) &&
		!inside([  8,   4], poly1_concave_ccw) &&

		!inside([ -4,   5], poly1_concave_ccw) &&
		 inside([ -3,   5], poly1_concave_ccw) &&
		!inside([ -2,   5], poly1_concave_ccw) &&
		!inside([ -1,   5], poly1_concave_ccw) &&
		!inside([  0,   5], poly1_concave_ccw) &&
		!inside([  1,   5], poly1_concave_ccw) &&
		!inside([  2,   5], poly1_concave_ccw) &&
		 inside([  3,   5], poly1_concave_ccw) &&
		 inside([  4,   5], poly1_concave_ccw) &&
		!inside([  5,   5], poly1_concave_ccw) &&
		!inside([  6,   5], poly1_concave_ccw) &&
		!inside([  7,   5], poly1_concave_ccw) &&
		!inside([  8,   5], poly1_concave_ccw) &&

		!inside([ -4,   6], poly1_concave_ccw) &&
		!inside([ -3,   6], poly1_concave_ccw) &&
		!inside([ -2,   6], poly1_concave_ccw) &&
		!inside([ -1,   6], poly1_concave_ccw) &&
		!inside([  0,   6], poly1_concave_ccw) &&
		!inside([  1,   6], poly1_concave_ccw) &&
		!inside([  2,   6], poly1_concave_ccw) &&
		 inside([  3,   6], poly1_concave_ccw) &&
		 inside([  4,   6], poly1_concave_ccw) &&
		!inside([  5,   6], poly1_concave_ccw) &&
		!inside([  6,   6], poly1_concave_ccw) &&
		!inside([  7,   6], poly1_concave_ccw) &&
		!inside([  8,   6], poly1_concave_ccw) &&

		!inside([ -4,   7], poly1_concave_ccw) &&
		!inside([ -3,   7], poly1_concave_ccw) &&
		!inside([ -2,   7], poly1_concave_ccw) &&
		!inside([ -1,   7], poly1_concave_ccw) &&
		!inside([  0,   7], poly1_concave_ccw) &&
		!inside([  1,   7], poly1_concave_ccw) &&
		!inside([  2,   7], poly1_concave_ccw) &&
		 inside([  3,   7], poly1_concave_ccw) &&
		 inside([  4,   7], poly1_concave_ccw) &&
		 inside([  5,   7], poly1_concave_ccw) &&
		!inside([  6,   7], poly1_concave_ccw) &&
		!inside([  7,   7], poly1_concave_ccw) &&
		!inside([  8,   7], poly1_concave_ccw) &&

		!inside([ -4,   8], poly1_concave_ccw) &&
		!inside([ -3,   8], poly1_concave_ccw) &&
		!inside([ -2,   8], poly1_concave_ccw) &&
		!inside([ -1,   8], poly1_concave_ccw) &&
		!inside([  0,   8], poly1_concave_ccw) &&
		!inside([  1,   8], poly1_concave_ccw) &&
		!inside([  2,   8], poly1_concave_ccw) &&
		 inside([  3,   8], poly1_concave_ccw) &&
		 inside([  4,   8], poly1_concave_ccw) &&
		!inside([  5,   8], poly1_concave_ccw) &&
		!inside([  6,   8], poly1_concave_ccw) &&
		!inside([  7,   8], poly1_concave_ccw) &&
		!inside([  8,   8], poly1_concave_ccw) &&

		!inside([ -4,   9], poly1_concave_ccw) &&
		!inside([ -3,   9], poly1_concave_ccw) &&
		!inside([ -2,   9], poly1_concave_ccw) &&
		!inside([ -1,   9], poly1_concave_ccw) &&
		!inside([  0,   9], poly1_concave_ccw) &&
		!inside([  1,   9], poly1_concave_ccw) &&
		!inside([  2,   9], poly1_concave_ccw) &&
		 inside([  3,   9], poly1_concave_ccw) &&
		!inside([  4,   9], poly1_concave_ccw) &&
		!inside([  5,   9], poly1_concave_ccw) &&
		!inside([  6,   9], poly1_concave_ccw) &&
		!inside([  7,   9], poly1_concave_ccw) &&
		!inside([  8,   9], poly1_concave_ccw) &&

		!inside([ -4,  10], poly1_concave_ccw) &&
		!inside([ -3,  10], poly1_concave_ccw) &&
		!inside([ -2,  10], poly1_concave_ccw) &&
		!inside([ -1,  10], poly1_concave_ccw) &&
		!inside([  0,  10], poly1_concave_ccw) &&
		!inside([  1,  10], poly1_concave_ccw) &&
		!inside([  2,  10], poly1_concave_ccw) &&
		!inside([  3,  10], poly1_concave_ccw) &&
		!inside([  4,  10], poly1_concave_ccw) &&
		!inside([  5,  10], poly1_concave_ccw) &&
		!inside([  6,  10], poly1_concave_ccw) &&
		!inside([  7,  10], poly1_concave_ccw) &&
		!inside([  8,  10], poly1_concave_ccw) ;
}

function testInside_concave_cw()
{
	return	!inside([ -4,  -3], poly1_concave_cw) &&
		!inside([ -3,  -3], poly1_concave_cw) &&
		!inside([ -2,  -3], poly1_concave_cw) &&
		!inside([ -1,  -3], poly1_concave_cw) &&
		!inside([  0,  -3], poly1_concave_cw) &&
		!inside([  1,  -3], poly1_concave_cw) &&
		!inside([  2,  -3], poly1_concave_cw) &&
		!inside([  3,  -3], poly1_concave_cw) &&
		!inside([  4,  -3], poly1_concave_cw) &&
		!inside([  5,  -3], poly1_concave_cw) &&
		!inside([  6,  -3], poly1_concave_cw) &&
		!inside([  7,  -3], poly1_concave_cw) &&
		!inside([  8,  -3], poly1_concave_cw) &&

		!inside([ -4,  -2], poly1_concave_cw) &&
		!inside([ -3,  -2], poly1_concave_cw) &&
		 inside([ -1,  -1], poly1_concave_cw) &&
		!inside([ -1,  -2], poly1_concave_cw) &&
		!inside([  0,  -2], poly1_concave_cw) &&
		!inside([  1,  -2], poly1_concave_cw) &&
		!inside([  2,  -2], poly1_concave_cw) &&
		!inside([  3,  -2], poly1_concave_cw) &&
		!inside([  4,  -2], poly1_concave_cw) &&
		!inside([  5,  -2], poly1_concave_cw) &&
		!inside([  6,  -2], poly1_concave_cw) &&
		!inside([  7,  -2], poly1_concave_cw) &&
		!inside([  8,  -2], poly1_concave_cw) &&

		!inside([ -4,  -1], poly1_concave_cw) &&
		!inside([ -3,  -1], poly1_concave_cw) &&
		!inside([ -2,  -1], poly1_concave_cw) &&
		 inside([ -1,  -1], poly1_concave_cw) &&
		 inside([  0,  -1], poly1_concave_cw) &&
		 inside([  1,  -1], poly1_concave_cw) &&
		 inside([  2,  -1], poly1_concave_cw) &&
		 inside([  3,  -1], poly1_concave_cw) &&
		 inside([  4,  -1], poly1_concave_cw) &&
		!inside([  5,  -1], poly1_concave_cw) &&
		!inside([  6,  -1], poly1_concave_cw) &&
		!inside([  7,  -1], poly1_concave_cw) &&
		!inside([  8,  -1], poly1_concave_cw) &&

		!inside([ -4,   0], poly1_concave_cw) &&
		!inside([ -3,   0], poly1_concave_cw) &&
		!inside([ -2,   0], poly1_concave_cw) &&
		 inside([ -1,   0], poly1_concave_cw) &&
		 inside([  0,   0], poly1_concave_cw) &&
		 inside([  1,   0], poly1_concave_cw) &&
		 inside([  2,   0], poly1_concave_cw) &&
		 inside([  3,   0], poly1_concave_cw) &&
		 inside([  4,   0], poly1_concave_cw) &&
		 inside([  5,   0], poly1_concave_cw) &&
		!inside([  6,   0], poly1_concave_cw) &&
		!inside([  7,   0], poly1_concave_cw) &&
		!inside([  8,   0], poly1_concave_cw) &&

		!inside([ -4,   1], poly1_concave_cw) &&
		!inside([ -3,   1], poly1_concave_cw) &&
		!inside([ -2,   1], poly1_concave_cw) &&
		 inside([ -1,   1], poly1_concave_cw) &&
		 inside([  0,   1], poly1_concave_cw) &&
		 inside([  1,   1], poly1_concave_cw) &&
		 inside([  2,   1], poly1_concave_cw) &&
		 inside([  3,   1], poly1_concave_cw) &&
		 inside([  4,   1], poly1_concave_cw) &&
		 inside([  5,   1], poly1_concave_cw) &&
		 inside([  6,   1], poly1_concave_cw) &&
		!inside([  7,   1], poly1_concave_cw) &&
		!inside([  8,   1], poly1_concave_cw) &&

		!inside([ -4,   2], poly1_concave_cw) &&
		 inside([ -3,   2], poly1_concave_cw) &&
		 inside([ -2,   2], poly1_concave_cw) &&
		 inside([ -1,   2], poly1_concave_cw) &&
		 inside([  0,   2], poly1_concave_cw) &&
		 inside([  1,   2], poly1_concave_cw) &&
		 inside([  2,   2], poly1_concave_cw) &&
		 inside([  3,   2], poly1_concave_cw) &&
		 inside([  4,   2], poly1_concave_cw) &&
		 inside([  5,   2], poly1_concave_cw) &&
		 inside([  6,   2], poly1_concave_cw) &&
		 inside([  7,   2], poly1_concave_cw) &&
		!inside([  8,   2], poly1_concave_cw) &&

		!inside([ -4,   3], poly1_concave_cw) &&
		 inside([ -3,   3], poly1_concave_cw) &&
		 inside([ -2,   3], poly1_concave_cw) &&
		 inside([ -1,   3], poly1_concave_cw) &&
		 inside([  0,   3], poly1_concave_cw) &&
		 inside([  1,   3], poly1_concave_cw) &&
		 inside([  2,   3], poly1_concave_cw) &&
		 inside([  3,   3], poly1_concave_cw) &&
		 inside([  4,   3], poly1_concave_cw) &&
		!inside([  5,   3], poly1_concave_cw) &&
		!inside([  6,   3], poly1_concave_cw) &&
		!inside([  7,   3], poly1_concave_cw) &&
		!inside([  8,   3], poly1_concave_cw) &&

		!inside([ -4,   4], poly1_concave_cw) &&
		 inside([ -3,   4], poly1_concave_cw) &&
		 inside([ -2,   4], poly1_concave_cw) &&
		 inside([ -1,   4], poly1_concave_cw) &&
		 inside([  0,   4], poly1_concave_cw) &&
		!inside([  1,   4], poly1_concave_cw) &&
		!inside([  2,   4], poly1_concave_cw) &&
		 inside([  3,   4], poly1_concave_cw) &&
		 inside([  4,   4], poly1_concave_cw) &&
		!inside([  5,   4], poly1_concave_cw) &&
		!inside([  6,   4], poly1_concave_cw) &&
		!inside([  7,   4], poly1_concave_cw) &&
		!inside([  8,   4], poly1_concave_cw) &&

		!inside([ -4,   5], poly1_concave_cw) &&
		 inside([ -3,   5], poly1_concave_cw) &&
		!inside([ -2,   5], poly1_concave_cw) &&
		!inside([ -1,   5], poly1_concave_cw) &&
		!inside([  0,   5], poly1_concave_cw) &&
		!inside([  1,   5], poly1_concave_cw) &&
		!inside([  2,   5], poly1_concave_cw) &&
		 inside([  3,   5], poly1_concave_cw) &&
		 inside([  4,   5], poly1_concave_cw) &&
		!inside([  5,   5], poly1_concave_cw) &&
		!inside([  6,   5], poly1_concave_cw) &&
		!inside([  7,   5], poly1_concave_cw) &&
		!inside([  8,   5], poly1_concave_cw) &&

		!inside([ -4,   6], poly1_concave_cw) &&
		!inside([ -3,   6], poly1_concave_cw) &&
		!inside([ -2,   6], poly1_concave_cw) &&
		!inside([ -1,   6], poly1_concave_cw) &&
		!inside([  0,   6], poly1_concave_cw) &&
		!inside([  1,   6], poly1_concave_cw) &&
		!inside([  2,   6], poly1_concave_cw) &&
		 inside([  3,   6], poly1_concave_cw) &&
		 inside([  4,   6], poly1_concave_cw) &&
		!inside([  5,   6], poly1_concave_cw) &&
		!inside([  6,   6], poly1_concave_cw) &&
		!inside([  7,   6], poly1_concave_cw) &&
		!inside([  8,   6], poly1_concave_cw) &&

		!inside([ -4,   7], poly1_concave_cw) &&
		!inside([ -3,   7], poly1_concave_cw) &&
		!inside([ -2,   7], poly1_concave_cw) &&
		!inside([ -1,   7], poly1_concave_cw) &&
		!inside([  0,   7], poly1_concave_cw) &&
		!inside([  1,   7], poly1_concave_cw) &&
		!inside([  2,   7], poly1_concave_cw) &&
		 inside([  3,   7], poly1_concave_cw) &&
		 inside([  4,   7], poly1_concave_cw) &&
		 inside([  5,   7], poly1_concave_cw) &&
		!inside([  6,   7], poly1_concave_cw) &&
		!inside([  7,   7], poly1_concave_cw) &&
		!inside([  8,   7], poly1_concave_cw) &&

		!inside([ -4,   8], poly1_concave_cw) &&
		!inside([ -3,   8], poly1_concave_cw) &&
		!inside([ -2,   8], poly1_concave_cw) &&
		!inside([ -1,   8], poly1_concave_cw) &&
		!inside([  0,   8], poly1_concave_cw) &&
		!inside([  1,   8], poly1_concave_cw) &&
		!inside([  2,   8], poly1_concave_cw) &&
		 inside([  3,   8], poly1_concave_cw) &&
		 inside([  4,   8], poly1_concave_cw) &&
		!inside([  5,   8], poly1_concave_cw) &&
		!inside([  6,   8], poly1_concave_cw) &&
		!inside([  7,   8], poly1_concave_cw) &&
		!inside([  8,   8], poly1_concave_cw) &&

		!inside([ -4,   9], poly1_concave_cw) &&
		!inside([ -3,   9], poly1_concave_cw) &&
		!inside([ -2,   9], poly1_concave_cw) &&
		!inside([ -1,   9], poly1_concave_cw) &&
		!inside([  0,   9], poly1_concave_cw) &&
		!inside([  1,   9], poly1_concave_cw) &&
		!inside([  2,   9], poly1_concave_cw) &&
		 inside([  3,   9], poly1_concave_cw) &&
		!inside([  4,   9], poly1_concave_cw) &&
		!inside([  5,   9], poly1_concave_cw) &&
		!inside([  6,   9], poly1_concave_cw) &&
		!inside([  7,   9], poly1_concave_cw) &&
		!inside([  8,   9], poly1_concave_cw) &&

		!inside([ -4,  10], poly1_concave_cw) &&
		!inside([ -3,  10], poly1_concave_cw) &&
		!inside([ -2,  10], poly1_concave_cw) &&
		!inside([ -1,  10], poly1_concave_cw) &&
		!inside([  0,  10], poly1_concave_cw) &&
		!inside([  1,  10], poly1_concave_cw) &&
		!inside([  2,  10], poly1_concave_cw) &&
		!inside([  3,  10], poly1_concave_cw) &&
		!inside([  4,  10], poly1_concave_cw) &&
		!inside([  5,  10], poly1_concave_cw) &&
		!inside([  6,  10], poly1_concave_cw) &&
		!inside([  7,  10], poly1_concave_cw) &&
		!inside([  8,  10], poly1_concave_cw) ;
}


function testSignedRotAngleSumWhenToured()
{
	return	cca(signedRotAngleSumWhenToured([[0, 0], [2, 1], [0, 4]]),  360) &&
		cca(signedRotAngleSumWhenToured([[0, 0], [0, 4], [2, 1]]), -360) ;
}

function testAngleSumWhenToured()
{
	return	cca(angleSumWhenToured([[0, 0], [2, 1], [0, 4]]), 360) &&
		cca(angleSumWhenToured([[0, 0], [0, 4], [2, 1]]), 360) ;
}


function testAngleTyper_dependent()
{
	function tPlus10(a) {return a + 10;}
	function tLeq (a, b) {return a <= b;}
	function tMult(a, b) {return a *  b;}
	function tPlus(a, b) {return a +  b;}

	function tIsEven (edge) {return edge % 2 == 0;}
	function tIsOdd  (edge) {return edge % 2 == 1;}
	function tAnd  (p1, p2) {return p1 && p2;}
	function tOr   (p1, p2) {return p1 || p2;}

	return	 angleTyper(subsequencer      ([                  ], tLeq     ), tPlus10, 1, tMult, tPlus) == 1                                            &&
		 angleTyper(subsequencer      ([  0, 120, 240     ], tLeq     ), tPlus10, 1, tMult, tPlus) == (  0+10) *  (120+10)  * (240+10)             &&
		 angleTyper(subsequencer      ([  0,  90, 180, 270], tLeq     ), tPlus10, 1, tMult, tPlus) == (  0+10) *  ( 90+10)  * (180+10)  * (270+10) &&
		 angleTyper(subsequencer      ([ 45, 150, 210, 315], tLeq     ), tPlus10, 1, tMult, tPlus) == ( 45+10) *  (150+10)  * (210+10)  * (315+10) &&
		 angleTyper(subsequencer      ([ 45, 210, 150, 315], tLeq     ), tPlus10, 1, tMult, tPlus) == ( 45+10) * ((210+10)  + (150+10)) * (315+10) &&
		 angleTyper(subsequencerRolled([-30, 135, 225,  30], areConvex), tPlus10, 1, tMult, tPlus) == ((30+10) + (- 30+10)) * (135+10)  * (225+10) &&

		 angleTyper(subsequencer      ([                  ], tLeq     ), tIsEven, true, tAnd, tOr   )  &&
		 angleTyper(subsequencer      ([  0, 120, 240     ], tLeq     ), tIsEven, true, tAnd, tOr   )  &&
		 angleTyper(subsequencer      ([  0,  90, 180, 270], tLeq     ), tIsEven, true, tAnd, tOr   )  &&
		!angleTyper(subsequencer      ([ 45, 150, 210, 315], tLeq     ), tIsEven, true, tAnd, tOr   )  &&
		!angleTyper(subsequencer      ([ 45, 210, 150, 315], tLeq     ), tIsEven, true, tAnd, tOr   )  &&
		!angleTyper(subsequencerRolled([-30, 135, 225,  30], areConvex), tIsEven, true, tAnd, tOr   )  &&
		!angleTyper(subsequencerRolled([-30, 135, 226,  30], areConvex), tIsEven, true, tAnd, tOr   )  &&
		!angleTyper(subsequencerRolled([-30, 136, 225,  30], areConvex), tIsEven, true, tAnd, tOr   )  &&
		 angleTyper(subsequencerRolled([-30, 136, 226,  30], areConvex), tIsEven, true, tAnd, tOr   )  &&
		 angleTyper(subsequencerRolled([-31, 136, 226,  30], areConvex), tIsEven, true, tAnd, tOr   )  &&
		 angleTyper(subsequencerRolled([-30, 136, 226,  31], areConvex), tIsEven, true, tAnd, tOr   )  &&
		!angleTyper(subsequencerRolled([-31, 136, 226,  31], areConvex), tIsEven, true, tAnd, tOr   )  ;
}

function testAngleTyper()
{
	function tPlus10(a)  {return a + 10;}
	function tLeq (a, b) {return a <= b;}
	function tMult(a, b) {return a *  b;}
	function tPlus(a, b) {return a +  b;}

	function tIsEven (edge) {return edge % 2 == 0;}
	function tIsOdd  (edge) {return edge % 2 == 1;}
	function tAnd  (p1, p2) {return p1 && p2;}
	function tOr   (p1, p2) {return p1 || p2;}

	return	 angleTyper([                                          ], tPlus10, 1, tMult, tPlus) == 1                                            &&
		 angleTyper([  {val:0}, {val:120}, {val:240}           ], tPlus10, 1, tMult, tPlus) == (  0+10) *  (120+10)  * (240+10)             &&
		 angleTyper([  {val:0}, {val: 90}, {val:180}, {val:270}], tPlus10, 1, tMult, tPlus) == (  0+10) *  ( 90+10)  * (180+10)  * (270+10) &&
		 angleTyper([ {val:45}, {val:150}, {val:210}, {val:315}], tPlus10, 1, tMult, tPlus) == ( 45+10) *  (150+10)  * (210+10)  * (315+10) &&
		 angleTyper([ {val:45}, {sub:[210, 150]}, {val:315}    ], tPlus10, 1, tMult, tPlus) == ( 45+10) * ((210+10)  + (150+10)) * (315+10) &&
		 angleTyper([{sub:[30, -30]}, {val:135}, {val:225}     ], tPlus10, 1, tMult, tPlus) == ((30+10) + (- 30+10)) * (135+10)  * (225+10) &&

		 angleTyper([                                          ], tIsEven, true, tAnd, tOr   )  &&
		 angleTyper([  {val:0}, {val:120}, {val:240}           ], tIsEven, true, tAnd, tOr   )  &&
		 angleTyper([  {val:0}, {val: 90}, {val:180}, {val:270}], tIsEven, true, tAnd, tOr   )  &&
		!angleTyper([ {val:45}, {val:150}, {val:210}, {val:315}], tIsEven, true, tAnd, tOr   )  &&
		!angleTyper([ {val:45}, {sub:[210, 150]} , {val:315}   ], tIsEven, true, tAnd, tOr   )  &&
		!angleTyper([{sub:[30, -30]}, {val:135}  , {val:225}   ], tIsEven, true, tAnd, tOr   )  ;

		!angleTyper([{sub:[30, -30]}, {val:135}  , {val:226}   ], tIsEven, true, tAnd, tOr   )  &&
		!angleTyper([{sub:[30, -30]}, {val:136}  , {val:225}   ], tIsEven, true, tAnd, tOr   )  &&
		 angleTyper([{sub:[30, -30]}, {val:136}  , {val:226}   ], tIsEven, true, tAnd, tOr   )  &&
		 angleTyper([{sub:[30, -31]}, {val:136}  , {val:226}   ], tIsEven, true, tAnd, tOr   )  &&
		 angleTyper([{sub:[31, -30]}, {val:136}  , {val:226}   ], tIsEven, true, tAnd, tOr   )  &&
		!angleTyper([{sub:[31, -31]}, {val:136}  , {val:226}   ], tIsEven, true, tAnd, tOr   )  ;
}


function testExecuteTree()
{
	function tPlus   (s, x) {return s       +  x       ;}
	function tMult   (p, x) {return p       *  x       ;}

	function tAndEven(p, x) {return p       && (x%2==0);}
	function tOrEven (s, x) {return s       || (x%2==0);}
	function tAnd  (p1, p2) {return p1 && p2;}

	return	executeTree(tPlus , 0, tMult , 1, tPlus, [                  ]) == 0 &&
		executeTree(tPlus , 0, tMult , 1, tPlus, [{sub:[]}          ]) == 1 &&
		executeTree(tPlus , 0, tMult , 1, tPlus, [{sub:[]}, {sub:[]}]) == 2 &&
		executeTree(tPlus , 0, tMult , 1, tPlus, [{val:10}, {val:20}, {sub:[30, 40]}, {val:50}, {sub:[]}, {val:7}]) == 10 + 20 + (30 * 40) + 50 + 1 + 7 &&

		 executeTree(tAndEven, true, tOrEven, false, tAnd, [                 ]) &&
		 executeTree(tAndEven, true, tOrEven, false, tAnd, [{val:12}         ]) &&
		 executeTree(tAndEven, true, tOrEven, false, tAnd, [{val:12}, {val:8}]) &&
		!executeTree(tAndEven, true, tOrEven, false, tAnd, [{val: 3}         ]) &&
		!executeTree(tAndEven, true, tOrEven, false, tAnd, [{val: 3}, {val:4}]) &&
		!executeTree(tAndEven, true, tOrEven, false, tAnd, [{val: 4}, {val:3}]) &&
		 executeTree(tAndEven, true, tOrEven, false, tAnd, [{val: 2}, {val:4}, {sub:[7,2]}]) &&
		!executeTree(tAndEven, true, tOrEven, false, tAnd, [{val: 2}, {val:1}, {sub:[7,2]}]) &&
		!executeTree(tAndEven, true, tOrEven, false, tAnd, [{val: 2}, {val:4}, {sub:[7,1]}]) &&
		true;
}


function testSubsequencerRolled()
{
	function tLeq (a, b) {return a <= b;}
	return	vecEq(subsequencerRolled([                                         ], tLeq     ), [                                                                                 ]) &&
		vecEq(subsequencerRolled([ 10                                      ], tLeq     ), [ {val:10}                                                                        ]) &&
		vecEq(subsequencerRolled([ 10,  20                                 ], tLeq     ), [ {sub:[20,  10]}                                                                 ]) &&
		vecEq(subsequencerRolled([ 10,  20,  30                            ], tLeq     ), [ {sub:[30,  10]},        {val:20}                                                ]) &&
		vecEq(subsequencerRolled([ 10,  20,  30,  25                       ], tLeq     ), [ {sub:[30,  25 ,  10]},  {val:20}                                                ]) &&
		vecEq(subsequencerRolled([ 10,  20,  30,  28,  34, 35,  23,  12, 55], tLeq     ), [ {sub:[55,  10]},        {val:20} , {sub:[30, 28]}, {val:34}, {sub:[35, 23, 12]} ]) &&
		vecEq(subsequencerRolled([ 10,  20,  30,  28,      35,  23,  12, 55], tLeq     ), [ {sub:[55,  10]},        {val:20},  {sub:[30, 28]},           {sub:[35, 23, 12]} ]) &&
		vecEq(subsequencerRolled([330, 135, 225,  30                       ], areConvex), [ {sub:[30, 330]},        {val:135}, {val:225}                                    ]) ;
}

function testSubsequencer()
{
	function tLeq (a, b) {return a <= b;}
	return	vecEq(subsequencer([                                         ], tLeq), [                                                                                 ]) &&
		vecEq(subsequencer([ 10                                      ], tLeq), [  {val:10}                                                                       ]) &&
		vecEq(subsequencer([ 10,  20                                 ], tLeq), [  {val:10},   {val:20}                                                           ]) &&
		vecEq(subsequencer([ 10,  20,  30                            ], tLeq), [  {val:10},   {val:20},  {val:30}                                                ]) &&
		vecEq(subsequencer([ 10,  20,  30,  25                       ], tLeq), [  {val:10},   {val:20},  {sub:[30, 25]}                                          ]) &&
		vecEq(subsequencer([ 10,  20,  30,  28,  34, 35,  23,  12, 55], tLeq), [  {val:10},   {val:20},  {sub:[30, 28]},  {val:34}, {sub:[35, 23, 12]},  {val:55}]) &&
		vecEq(subsequencer([ 10,  20,  30,  28,      35,  23,  12, 55], tLeq), [  {val:10},   {val:20},  {sub:[30, 28]},            {sub:[35, 23, 12]},  {val:55}]) ;
}

function testRollToJoin()
{
	function tLeq  (a,b){return a <= b;}
	function tNever(a,b){return false;}
	return	vecEq(rollToJoin([            ], tLeq      ), [            ]) &&
		vecEq(rollToJoin([10          ], tLeq      ), [10          ]) &&
		vecEq(rollToJoin([10,  20     ], tLeq      ), [20,  10     ]) &&
		vecEq(rollToJoin([10,  20,  30], tLeq      ), [30,  10,  20]) &&
		vecEq(rollToJoin([10, 130, 250], areConvex), [10, 130, 250]) &&
		vecEq(rollToJoin([10,  20,  30], tNever    ), [10,  20,  30]) ;
}


function testAreConvex()
{
	return	!areConvex(   0,  350) &&
		!areConvex(   0, - 10) &&
		 areConvex(   0,   10) &&
		 areConvex(   0,    0) &&
		 areConvex(   0,  360) &&
		 areConvex( 360,    0) &&
		 areConvex( 360,  360) &&
		 areConvex( 360, -360) &&
		 areConvex(-360,  360) ;
}

function testIsConvex() // the case of == 180 is unspecified behavior
{
	return	 isConvex(    0) &&
		 isConvex(   10) &&
		 isConvex(  170) &&
		!isConvex(  190) &&
		!isConvex(  350) &&
		 isConvex(  360) &&
		 isConvex(  370) &&
		 isConvex(  530) &&
		!isConvex(  550) &&
		!isConvex(-  10) &&
		!isConvex(- 170) &&
		 isConvex(- 190) &&
		 isConvex(- 350) &&
		 isConvex(- 360) &&
		!isConvex(- 370) &&
		!isConvex(- 530) &&
		 isConvex(- 550) &&
		 isConvex(- 710) &&
		 isConvex(- 720) &&
		!isConvex(- 730) ;
}

function testAngleMod()
{
	return	angleMod(    0) ==   0 &&
		angleMod(   10) ==  10 &&
		angleMod(  360) ==   0 &&
		angleMod(  350) == 350 &&
		angleMod(  370) ==  10 &&
		angleMod(  710) == 350 &&
		angleMod(  720) ==   0 &&
		angleMod(  730) ==  10 &&
		angleMod( 1070) == 350 &&
		angleMod( 1080) ==   0 &&
		angleMod( 1090) ==  10 &&
		angleMod(-   0) ==   0 &&
		angleMod(-  10) == 350 &&
		angleMod(- 350) ==  10 &&
		angleMod(- 360) ==   0 &&
		angleMod(- 370) == 350 &&
		angleMod(- 710) ==  10 &&
		angleMod(- 720) ==   0 &&
		angleMod(- 730) == 350 &&
		angleMod(-1070) ==  10 &&
		angleMod(-1080) ==   0 &&
		angleMod(-1090) == 350 ;
}

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


function testAngleOfEdges()
{
	return	angleOfEdges([[1, 2], [1, 3]], [[5, 7], [5, 12]]) ==   0 &&
		angleOfEdges([[2, 1], [2, 3]], [[5, 7], [5, 12]]) ==   0 &&
		angleOfEdges([[1, 2], [3, 2]], [[5, 7], [5, 12]]) ==  90 &&
		angleOfEdges([[1, 2], [4, 5]], [[5, 7], [4,  8]]) ==  90 &&
		angleOfEdges([[2, 1], [4, 4]], [[5, 2], [1, -4]]) == 180 ;
}





function testSectionSide()
{
	return	sectionSide([5, 4], [8, 6], [-2, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [-1, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 0, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 1, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 2, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 3, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 4, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 5, -2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 6, -2]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [-1, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 0, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 1, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 2, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 3, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 4, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 5, -1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 6, -1]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2,  0]) >  0 &&
		sectionSide([5, 4], [8, 6], [-1,  0]) == 0 &&
		sectionSide([5, 4], [8, 6], [ 0,  0]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 1,  0]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 2,  0]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 3,  0]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 4,  0]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 5,  0]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 6,  0]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2,  1]) >  0 &&
		sectionSide([5, 4], [8, 6], [-1,  1]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 0,  1]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 1,  1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 2,  1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 3,  1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 4,  1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 5,  1]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 6,  1]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2,  2]) >  0 &&
		sectionSide([5, 4], [8, 6], [-1,  2]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 0,  2]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 1,  2]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 2,  2]) == 0 &&
		sectionSide([5, 4], [8, 6], [ 3,  2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 4,  2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 5,  2]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 6,  2]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2,  3]) >  0 &&
		sectionSide([5, 4], [8, 6], [-1,  3]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 0,  3]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 1,  3]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 2,  3]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 3,  3]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 4,  3]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 5,  3]) <  0 &&
		sectionSide([5, 4], [8, 6], [ 6,  3]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [-1,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 0,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 1,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 2,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 3,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 4,  4]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 5,  4]) == 0 &&
		sectionSide([5, 4], [8, 6], [ 6,  4]) <  0 &&

		sectionSide([5, 4], [8, 6], [-2,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [-1,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 0,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 1,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 2,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 3,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 4,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 5,  5]) >  0 &&
		sectionSide([5, 4], [8, 6], [ 6,  5]) >  0;
}


function testLineSide()
{
	return	lineSide([5, 4], [3, 2], [-2, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [-1, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 0, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 1, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 2, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 3, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 4, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 5, -2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 6, -2]) <  0 &&

		lineSide([5, 4], [3, 2], [-2, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [-1, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 0, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 1, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 2, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 3, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 4, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 5, -1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 6, -1]) <  0 &&

		lineSide([5, 4], [3, 2], [-2,  0]) >  0 &&
		lineSide([5, 4], [3, 2], [-1,  0]) == 0 &&
		lineSide([5, 4], [3, 2], [ 0,  0]) <  0 &&
		lineSide([5, 4], [3, 2], [ 1,  0]) <  0 &&
		lineSide([5, 4], [3, 2], [ 2,  0]) <  0 &&
		lineSide([5, 4], [3, 2], [ 3,  0]) <  0 &&
		lineSide([5, 4], [3, 2], [ 4,  0]) <  0 &&
		lineSide([5, 4], [3, 2], [ 5,  0]) <  0 &&
		lineSide([5, 4], [3, 2], [ 6,  0]) <  0 &&

		lineSide([5, 4], [3, 2], [-2,  1]) >  0 &&
		lineSide([5, 4], [3, 2], [-1,  1]) >  0 &&
		lineSide([5, 4], [3, 2], [ 0,  1]) >  0 &&
		lineSide([5, 4], [3, 2], [ 1,  1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 2,  1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 3,  1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 4,  1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 5,  1]) <  0 &&
		lineSide([5, 4], [3, 2], [ 6,  1]) <  0 &&

		lineSide([5, 4], [3, 2], [-2,  2]) >  0 &&
		lineSide([5, 4], [3, 2], [-1,  2]) >  0 &&
		lineSide([5, 4], [3, 2], [ 0,  2]) >  0 &&
		lineSide([5, 4], [3, 2], [ 1,  2]) >  0 &&
		lineSide([5, 4], [3, 2], [ 2,  2]) == 0 &&
		lineSide([5, 4], [3, 2], [ 3,  2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 4,  2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 5,  2]) <  0 &&
		lineSide([5, 4], [3, 2], [ 6,  2]) <  0 &&

		lineSide([5, 4], [3, 2], [-2,  3]) >  0 &&
		lineSide([5, 4], [3, 2], [-1,  3]) >  0 &&
		lineSide([5, 4], [3, 2], [ 0,  3]) >  0 &&
		lineSide([5, 4], [3, 2], [ 1,  3]) >  0 &&
		lineSide([5, 4], [3, 2], [ 2,  3]) >  0 &&
		lineSide([5, 4], [3, 2], [ 3,  3]) >  0 &&
		lineSide([5, 4], [3, 2], [ 4,  3]) <  0 &&
		lineSide([5, 4], [3, 2], [ 5,  3]) <  0 &&
		lineSide([5, 4], [3, 2], [ 6,  3]) <  0 &&

		lineSide([5, 4], [3, 2], [-2,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [-1,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [ 0,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [ 1,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [ 2,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [ 3,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [ 4,  4]) >  0 &&
		lineSide([5, 4], [3, 2], [ 5,  4]) == 0 &&
		lineSide([5, 4], [3, 2], [ 6,  4]) <  0 &&

		lineSide([5, 4], [3, 2], [-2,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [-1,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 0,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 1,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 2,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 3,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 4,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 5,  5]) >  0 &&
		lineSide([5, 4], [3, 2], [ 6,  5]) >  0;
}

function testAreConvexDirectedEdges()
{
	return	 areConvexDirectedEdges([[-2, -2], [ 4, -1]], [[ 4, -1], [ 7,  2]]) &&
		 areConvexDirectedEdges([[ 4, -1], [ 7,  2]], [[ 7,  2], [ 5,  2]]) &&
		!areConvexDirectedEdges([[ 7,  2], [ 5,  2]], [[ 5,  2], [ 4,  4]]) &&
		!areConvexDirectedEdges([[ 5,  2], [ 4,  4]], [[ 4,  4], [ 5,  7]]) &&
		 areConvexDirectedEdges([[ 4,  4], [ 5,  7]], [[ 5,  7], [ 3,  9]]) &&
		 areConvexDirectedEdges([[ 5,  7], [ 3,  9]], [[ 3,  9], [ 3,  3]]) &&
		!areConvexDirectedEdges([[ 3,  9], [ 3,  3]], [[ 3,  3], [-3,  5]]) &&
		 areConvexDirectedEdges([[ 3,  3], [-3,  5]], [[-3,  5], [-3,  2]]) &&
		 areConvexDirectedEdges([[-3,  5], [-3,  2]], [[-3,  2], [-1,  1]]) &&
		!areConvexDirectedEdges([[-3,  2], [-1,  1]], [[-1,  1], [-2, -2]]) &&
		 areConvexDirectedEdges([[-1,  1], [-2, -2]], [[-2, -2], [ 4, -1]]) ;
}

function testAreConcaveDirectedEdges()
{
	return	!areConcaveDirectedEdges([[-2, -2], [ 4, -1]], [[ 4, -1], [ 7,  2]]) &&
		!areConcaveDirectedEdges([[ 4, -1], [ 7,  2]], [[ 7,  2], [ 5,  2]]) &&
		 areConcaveDirectedEdges([[ 7,  2], [ 5,  2]], [[ 5,  2], [ 4,  4]]) &&
		 areConcaveDirectedEdges([[ 5,  2], [ 4,  4]], [[ 4,  4], [ 5,  7]]) &&
		!areConcaveDirectedEdges([[ 4,  4], [ 5,  7]], [[ 5,  7], [ 3,  9]]) &&
		!areConcaveDirectedEdges([[ 5,  7], [ 3,  9]], [[ 3,  9], [ 3,  3]]) &&
		 areConcaveDirectedEdges([[ 3,  9], [ 3,  3]], [[ 3,  3], [-3,  5]]) &&
		!areConcaveDirectedEdges([[ 3,  3], [-3,  5]], [[-3,  5], [-3,  2]]) &&
		!areConcaveDirectedEdges([[-3,  5], [-3,  2]], [[-3,  2], [-1,  1]]) &&
		 areConcaveDirectedEdges([[-3,  2], [-1,  1]], [[-1,  1], [-2, -2]]) &&
		!areConcaveDirectedEdges([[-1,  1], [-2, -2]], [[-2, -2], [ 4, -1]]) ;
}

function testEdgeVector()
{
	return	 vecEq(edgeVector([[-2, -2], [ 4, -1]]), [ 6,  1]) &&
		 vecEq(edgeVector([[ 4, -1], [ 7,  2]]), [ 3,  3]) &&
		 vecEq(edgeVector([[ 7,  2], [ 5,  2]]), [-2,  0]) &&
		 vecEq(edgeVector([[ 5,  2], [ 4,  4]]), [-1,  2]) &&
		 vecEq(edgeVector([[ 4,  4], [ 5,  7]]), [ 1,  3]) &&
		 vecEq(edgeVector([[ 1,  4], [ 4,  6]]), [ 3,  2]) ;
}

function testAreConvexVectors()
{
	return	true && //areConvexVectors([ 2,  1], [ 2,  1]) is unspecified
		 areConvexVectors([ 2,  1], [ 1,  1]) &&
		//areConvexVectors([ 2,  2], [ 1,  1]) is unspecified
		 areConvexVectors([ 2,  1], [ 0,  1]) &&
		 areConvexVectors([ 2,  1], [-1,  1]) &&
		 areConvexVectors([ 2,  1], [-1,  0]) &&
		//areConvexVectors([ 2,  1], [-2, -1]) is unspecified
		//areConvexVectors([ 2,  1], [-4, -2]) is unspecified
		!areConvexVectors([ 2,  1], [-1, -1]) &&
		!areConvexVectors([ 2,  1], [-1, -2]) &&
		!areConvexVectors([ 2,  1], [ 0, -1]) &&
		!areConvexVectors([ 2,  1], [ 1, -2]) &&
		!areConvexVectors([ 2,  1], [ 1, -1]) &&
		!areConvexVectors([ 2,  1], [ 2, -1]) &&
		!areConvexVectors([ 2,  1], [ 1,  0]) &&
		!areConvexVectors([ 2,  1], [ 2,  0]);
}

function testAreConcaveVectors()
{
	return	true && //areConcaveVectors([ 2,  1], [ 2,  1]) is unspecified
		!areConcaveVectors([ 2,  1], [ 1,  1]) &&
		//areConcaveVectors([ 2,  2], [ 1,  1]) is unspecified
		!areConcaveVectors([ 2,  1], [ 0,  1]) &&
		!areConcaveVectors([ 2,  1], [-1,  1]) &&
		!areConcaveVectors([ 2,  1], [-1,  0]) &&
		//areConcaveVectors([ 2,  1], [-2, -1]) is unspecified
		//areConcaveVectors([ 2,  1], [-4, -2]) is unspecified
		 areConcaveVectors([ 2,  1], [-1, -1]) &&
		 areConcaveVectors([ 2,  1], [-1, -2]) &&
		 areConcaveVectors([ 2,  1], [ 0, -1]) &&
		 areConcaveVectors([ 2,  1], [ 1, -2]) &&
		 areConcaveVectors([ 2,  1], [ 1, -1]) &&
		 areConcaveVectors([ 2,  1], [ 2, -1]) &&
		 areConcaveVectors([ 2,  1], [ 1,  0]) &&
		 areConcaveVectors([ 2,  1], [ 2,  0]);
}


function testScalarProduct()
{
	return	scalarProduct([ 0,  0], [ 2,  3]) ==  0 &&
		scalarProduct([ 2,  5], [ 7,  3]) == 29 &&
		scalarProduct([-2,  5], [ 7,  3]) ==  1 &&
		scalarProduct([ 2,  5], [ 7, -3]) == -1;
}

function testVectorLength()
{
	return	vectorLength([0 ,  0]) == 0 &&
		vectorLength([0 ,  6]) == 6 &&
		vectorLength([7 ,  0]) == 7 &&
		vectorLength([0 , -6]) == 6 &&
		vectorLength([-7,  0]) == 7 &&
		vectorLength([ 3,  4]) == 5 &&
		vectorLength([ 3, -4]) == 5 &&
		vectorLength([-3,  4]) == 5 &&
		vectorLength([-3, -4]) == 5 ;
}

function cca(x, r) {return Math.abs(x - r) < 0.001;}

function testSignedRotAngleOfVectors()
{
	return	cca(signedRotAngleOfVectors([ 1,  0], [ 0,  1]),  90) &&
		cca(signedRotAngleOfVectors([ 1,  0], [ 1,  1]),  45) &&
		cca(signedRotAngleOfVectors([ 2,  0], [ 0,  3]),  90) &&
		cca(signedRotAngleOfVectors([ 5,  0], [ 7,  7]),  45) &&
		cca(signedRotAngleOfVectors([ 0,  1], [ 1,  0]), -90) &&
		cca(signedRotAngleOfVectors([ 1,  1], [ 1,  0]), -45) &&
		cca(signedRotAngleOfVectors([ 1,  1], [ 0,  1]),  45) &&
		cca(signedRotAngleOfVectors([ 0,  1], [ 1,  1]), -45) &&
		cca(signedRotAngleOfVectors([ 2,  0], [-2,  0]), 180) &&
		cca(signedRotAngleOfVectors([ 2,  3], [-4, -6]), 180) ;
}

function testAngleOfVectors()
{
	return	cca(angleOfVectors([ 1,  0], [ 0,  1]),  90) &&
		cca(angleOfVectors([ 1,  0], [ 1,  1]),  45) &&
		cca(angleOfVectors([ 2,  0], [ 0,  3]),  90) &&
		cca(angleOfVectors([ 5,  0], [ 7,  7]),  45) &&
		cca(angleOfVectors([ 0,  1], [ 1,  0]),  90) &&
		cca(angleOfVectors([ 1,  1], [ 1,  0]),  45) &&
		cca(angleOfVectors([ 1,  1], [ 0,  1]),  45) &&
		cca(angleOfVectors([ 0,  1], [ 1,  1]),  45) &&
		cca(angleOfVectors([ 2,  0], [-2,  0]), 180) &&
		cca(angleOfVectors([ 2,  3], [-4, -6]), 180) ; // a naive implementation provides `NaN` through `acos(-1.0000...2)`
}

function testDet()
{
	return	det([ 2,  1], [ 2,  1]) == 0 &&
		det([ 2,  1], [ 1,  1]) >  0 &&
		det([ 2,  2], [ 1,  1]) == 0 &&
		det([ 2,  1], [ 0,  1]) >  0 &&
		det([ 2,  1], [-1,  1]) >  0 &&
		det([ 2,  1], [-1,  0]) >  0 &&
		det([ 2,  1], [-2, -1]) == 0 &&
		det([ 2,  1], [-4, -2]) == 0 &&
		det([ 2,  1], [-1, -1]) <  0 &&
		det([ 2,  1], [-1, -2]) <  0 &&
		det([ 2,  1], [ 0, -1]) <  0 &&
		det([ 2,  1], [ 1, -2]) <  0 &&
		det([ 2,  1], [ 1, -1]) <  0 &&
		det([ 2,  1], [ 2, -1]) <  0 &&
		det([ 2,  1], [ 1,  0]) <  0 &&
		det([ 2,  1], [ 2,  0]) <  0;
}
