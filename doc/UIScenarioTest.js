function UIScenarioTest() {}

UIScenarioTest.prototype = Object.create(Test.prototype);

UIScenarioTest.prototype.constructor = UIScenarioTest;

UIScenarioTest.prototype. = function ()
{
	var svgCanvas = new SvgCanvas();
	svgCanvas.element != null;
};

UIScenarioTest.prototype. = function ()
{
	var svgPolygon = new SvgPolygon([[0,0], [2,0], [1,1]]);
	svgPolygon.element != null;
	svgPoligon.getId();
	svgPoligon.checkIdForUniqueness(); // use in constructor and in addOrReplantToSvgCanvas. Use UniqueId as auxiliary, or inherit from such a class (usage is better than inheritance)
	svgPoligon.generateIdUnique();     // part of (used only in) constructor. Use UniqueId as auxiliary, or inherit from such a class (usage is better than inheritance)
	svgPoligon.addOrMoveToSvgCanvas(); // preserve ID uniqueness. Use UniqueId as auxiliary, or inherit from such a class (usage is better than inheritance)
	svgPoligon.removeFromEntrireDocument();
	svgPolygon.rewrite([0,0], [4,0], [2,2]);
};

UIScenarioTest.prototype. = function ()
{
	var cST = CoordSysTr([200, 300], 10, [true, false]);
	cST.lowToHigh;
	sst.highToLow;
};

UIScenarioTest.prototype. = function ()
{
	var highPolygon = new HighPolygon();
	highPolygon.translate()
	highPolygon.scale()
	highPolygon.mirror()
};

UIScenarioTest.prototype. = function ()
{
	var widgetPolygon = new WidgetPolygon(svgCanvas, cST, highPolygon); // creates internally an svgPolygon, and keeps maintaining it durig entire lifetime
};

UniqueIderTest.prototype.testGenerateIdUnique = function ()
{
	var documentMock_ = {
		communication: [],
		track: function (name, args, result) {this.communication.push({name: name, args: args, result: result});},
		getElementById: function (id) {var result = null; this.track('getElementById', [id], result); return result;}
	};
	var uiider_ = new UniqueIder(documentMock_);
	var flag__v1 = vecEq(documentMock_.communication, []);
	var flag__v2 = uiider_.generateIdUnique() == 'id_0';
	var flag__v3 = vecEq( documentMock_.communication, [
			{name: 'getElementById', args: ['id_0'], result: null}
	]);
	var flag_    = flag_v_1 && flag_v_2 && flag_v_3;

	var documentMock_0 = {
		communication: [],
		track: function (name, args, result) {this.communication.push({name: name, args: args, result: result});},
		getElementById: function (id) {var result = id == 'id_0' ? {} : null; this.track('getElementById', [id], result); return result;}
	};
	var uiider_0 = new UniqueIder(documentMock_0);
	var flag_0_v1 = vecEq(documentMock_0.communication, []);
	var flag_0_v2 = uiider_0.generateIdUnique() == 'id_1';
	var flag_0_v3 = vecEq(documentMock_0.communication, [
		{name: 'getElementById', args: ['id_0'], result: {}  },
		{name: 'getElementById', args: ['id_1'], result: null}
	]);
	var flag_0    = flag_0_v1 && flag_0_v2 && flag_0_v3;

	var documentMock_01 = {
		communication: [],
		track: function (name, args, result) {this.communication.push({name: name, args: args, result: result});},
		getElementById: function (id) {var result = id == 'id_0' || id == 'id_1' ? {} : null; this.track('getElementById', [id], result); return result;}
	};
	var uiider_01 = new UniqueIder(documentMock_01);
	var flag_01_v1 = vecEq(documentMock_01.communication, []);
	var flag_01_v2 = uiider_01.generateIdUnique() == 'id_2';
	var flag_01_v3 = vecEq(documentMock_01.communication, [
		{name: 'getElementById', args: ['id_0'], result: {}  },
		{name: 'getElementById', args: ['id_1'], result: {}  },
		{name: 'getElementById', args: ['id_2'], result: null}
	]);
	var flag_01    = flag_01_v1 && flag_01_v2 && flag_01_v3;

	var documentMock_012 = {
		communication: [],
		track: function (name, args, result) {this.communication.push({name: name, args: args, result: result});},
		getElementById: function (id) {var result = id == 'id_0' || id == 'id_1' || id == 'id_2' ? {} : null; this.track('getElementById', [id], result); return result;}
	};
	var uiider_012 = new UniqueIder(documentMock_012);
	var flag_012_v1 = vecEq(documentMock_012.communication, []);
	var flag_012_v2 = uiider_012.generateIdUnique() == 'id_3';
	var flag_012_v3 = vecEq(documentMock_012.communication, [
		{name: 'getElementById', args: ['id_0'], result: {}  },
		{name: 'getElementById', args: ['id_1'], result: {}  },
		{name: 'getElementById', args: ['id_2'], result: {}  },
		{name: 'getElementById', args: ['id_3'], result: null}
	]);
	var flag_012    = flag_012_v1 && flag_012_v2 && flag_012_v3;

	return flag_ && flag_0 && flag_01 && flag_012;
};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};

UIScenarioTest.prototype. = function ()
{

};


