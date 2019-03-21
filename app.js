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
