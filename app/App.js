function App()
{
	this.svgGraphics         = new SvgGraphics([1000, 600], 25, sampleFigureBank());  //  [600, 400] is SVG width and height, and 10 is the coordinate system transformation scale;
	this.html5canvasGraphics = new Html5canvasGraphics([1000, 1000]);                 // canvas only prepared

	// RAII approach: Subscription to event handlers gets here too, because a corresponding destructor (if needed) could take down these events
	var that = this;
	document.addEventListener('click'     , function (event) {that.clickHandler(event);}      ); // `(event) => this.clickHandler(event)`     is nicer but less portable
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

// @TODO obsolete, unused
function createGraphics(tagName, id, width, height, namespaceURI = null)
{
	var attrs = {id:id, width:width, height:height};
	return createElementWithAttributes(tagName, attrs, namespaceURI);
}
