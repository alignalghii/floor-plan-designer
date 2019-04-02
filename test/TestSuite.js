function TestSuite(grOK = 0, grAll = 0)
{
	this.grAll = grAll;
	this.grOK  = grOK;
}

TestSuite.prototype.run = function ()
{
	// Math:
	var geometryPolygonTest = new GeometryPolygonTest();
	var geometryTest        = new GeometryTest();
	var geometryVectorTest  = new GeometryVectorTest();
	var dataHashTest        = new DataHashTest();
	var dataListTest        = new DataListTest();
	// Domain:
	var graphTest           = new GraphTest();
	var boardTest           = new BoardTest();
	var figureTest          = new FigureTest();
	// Low-level:
	var svgLowLevelTest     = new SvgLowLevelTest();

	var groupings = [
				{id: 'result_math',   flag: geometryPolygonTest.run() && geometryTest.run() && geometryVectorTest.run() && dataHashTest.run() && dataListTest.run() && graphTest.run()},
				{id: 'result_domain', flag: boardTest.run() && figureTest.run()   },
				{id: 'result_low' ,   flag: svgLowLevelTest.run()                 }
	];

	for (var i = 0; i < groupings.length; i++) {
		var grouping = groupings[i];
		document.getElementById(grouping.id).innerHTML = grouping.flag ? 'OK' : 'Wrong';
		this.count(grouping.flag);
	}

	this.report();
};

TestSuite.prototype.count = function (flag)
{
	if (flag) this.grOK++;
	this.grAll++;
}

TestSuite.prototype.report = function () {console.log('' + this.grOK + '/' + this.grAll + '');}
