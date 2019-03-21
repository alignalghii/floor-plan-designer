/*******************************
 * Drawing figure, map it to SVG:
 *******************************/

const SvgSingletonGlobals =
{
	svg: null, svgPoint: null, board: null, standingFig: null, movingFig: null, id_standing: null, id_moving: null,                  // set/unset always simultaneosly

	renull: function () {
		deleteElementsWithTagNames(['canvas', 'svg']);
		this.svg = this.svgPoint = this.board = this.standingFig = this.movingFig = this.id_standing = this.id_moving = null;    // set/unset always simultaneosly
	},

	reload: function () {
		this.svg         = createAndAppendChildWithAttrs(document.body, 'svg'   , {id:'screen', width:600,height:400}, svgNS);   // set/unset always simultaneosly
		this.svgPoint    = this.svg.createSVGPoint();                                                                            // set/unset always simultaneosly
		this.board       = emptyBoard;                                                                                           // set/unset always simultaneosly
		this.standingFig = new Figure([0, 0], [[ 2,  3], [ 6,  3], [ 5,  5]          ], {fill: 'red' });                         // set/unset always simultaneosly
		this.movingFig   = new Figure([0, 0], [[ 1, -1], [ 1,  1], [-1,  1], [-1, -1]], {fill: 'blue'});                         // set/unset always simultaneosly
		this.id_standing = this.board.addFigure(this.standingFig); // @TODO procedural
		this.id_moving   = this.board.addFigure(this.movingFig  ); // @TODO procedural
		redrawFigure(this.id_standing, this.board, domainToSvg_600_400_10, this.svg);
		redrawFigure(this.id_moving  , this.board, domainToSvg_600_400_10, this.svg);
		//svg.setAttributeNS(xmlns, 'xmlns'      , svgNS);
		//svg.setAttributeNS(xmlns, 'xmlns:xlink', xlink);
	},

	assimilateEventPosition: function (event) {
		this.svgPoint.x = event.clientX;
		this.svgPoint.y = event.clientY;
		var showPoint        = this.svgPoint.matrixTransform(SvgSingletonGlobals.svg.getScreenCTM().inverse());
		var clickDomainPoint = svgToDomain_600_400_10([showPoint.x, showPoint.y]);
		var displacement     = fromTo(this.movingFig.grasp, clickDomainPoint);
		this.movingFig.doTranslation(displacement);                                     // @TODO procedural
		this.board.updateFigure(this.id_moving, this.movingFig);                        // @TODO procedural
		redrawFigure(SvgSingletonGlobals.id_moving, SvgSingletonGlobals.board, domainToSvg_600_400_10, SvgSingletonGlobals.svg);
	},

	hasBeenSet: function () {
		return this.svg && this.svgPoint;  // svg <-> svgPoint <-> ...
	}
}
