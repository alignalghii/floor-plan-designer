const routes = {
	'canvas_button': function (event) {this.svgGraphics.unrender();         this.html5canvasGraphics.render();},
	'svg_button'   : function (event) {this.html5canvasGraphics.unrender(); this.svgGraphics.render();        },
	'screen'       : function (event) {this.svgGraphics.focusOff();                                           },
	'fig_.*'       : function (event) {this.svgGraphics.focusToggle(event);                                   }
};

function App()
{
	this.svgGraphics         = new SvgGraphics([1000, 600], 25, sampleFigureBank());  //  [600, 400] is SVG width and height, and 10 is the coordinate system transformation scale;
	this.html5canvasGraphics = new Html5canvasGraphics([1000, 1000]);                 // canvas only prepared

	// RAII approach: Subscription to event handlers gets here too, because a corresponding destructor (if needed) could take down these events
	var that = this;
	document.addEventListener('click'     , that.dispatch(routes)                             ); // `(event) => this.clickHandler(event)`     is nicer but less portable
	document.addEventListener('mousemove' , function (event) {that.mousemoveHandler(event);}  ); // `(event) => this.mousemoveHandler(event)` is nicer but less portable
}

App.prototype.run = function ()
{
	// Unit tests:
	var testSuite = new TestSuite();
	testSuite.run();
	// Dynamic graphics areas
	this.svgGraphics.render();                                        // svg gets rendered, too (canvas only prepared)
};


App.prototype.dispatch = function (routes)
{
	var that = this;
	function router(event)
	{
		target = event.target.id;
		for (var pattern in routes) {
			if (routes.hasOwnProperty(pattern)) {
				var regExp = new RegExp(pattern);
				if (regExp.test(target)) {
					routes[pattern].call(that, event);
					break;
				}
			}
		}
	}
	return router;
};


App.prototype.mousemoveHandler = function (event) {this.svgGraphics.assimilateEventPositionOnFocusIfAny(event);}
