function CoordSysTransformationTest(nOK = 0, nAll = 0) {Test.call(this, nOK, nAll);}

CoordSysTransformationTest.prototype = Object.create(Test.prototype);

CoordSysTransformationTest.prototype.constructor = CoordSysTransformationTest;

CoordSysTransformationTest.prototype.testLowToHigh = function ()
{
	var coordSysTransformation_1 = new CoordSysTransformation([300, 200], 10, [true, true]);
	var flag_1 = eq(coordSysTransformation_1.lowToHigh([300, 200]), [0, 0]) && eq(coordSysTransformation_1.lowToHigh([370, 180]), [ 7, -2]);

	var coordSysTransformation_2 = new CoordSysTransformation([300, 200], 10, [true, false]);
	var flag_2 = eq(coordSysTransformation_2.lowToHigh([300, 200]), [0, 0]) && eq(coordSysTransformation_2.lowToHigh([370, 180]), [ 7,  2]);

	var coordSysTransformation_3 = new CoordSysTransformation([300, 200], 10, [false, true]);
	var flag_3 = eq(coordSysTransformation_3.lowToHigh([300, 200]), [0, 0]) && eq(coordSysTransformation_3.lowToHigh([370, 180]), [-7, -2]);

	var coordSysTransformation_4 = new CoordSysTransformation([300, 200], 10, [false, false]);
	var flag_4 = eq(coordSysTransformation_4.lowToHigh([300, 200]), [0, 0]) && eq(coordSysTransformation_4.lowToHigh([370, 180]), [-7,  2]);

	return flag_1 && flag_2 && flag_3 && flag_4;
};


CoordSysTransformationTest.prototype.testHighToLow = function ()
{
	var coordSysTransformation_1 = new CoordSysTransformation([300, 200], 10, [true, true]);
	var flag_1 = eq(coordSysTransformation_1.highToLow([0, 0]), [300, 200]) && eq(coordSysTransformation_1.highToLow([7, 2]), [370, 220]);

	var coordSysTransformation_2 = new CoordSysTransformation([300, 200], 10, [true, false]);
	var flag_2 = eq(coordSysTransformation_2.highToLow([0, 0]), [300, 200]) && eq(coordSysTransformation_2.highToLow([7, 2]), [370, 180]);

	var coordSysTransformation_3 = new CoordSysTransformation([300, 200], 10, [false, true]);
	var flag_3 = eq(coordSysTransformation_3.highToLow([0, 0]), [300, 200]) && eq(coordSysTransformation_3.highToLow([7, 2]), [230, 220]);

	var coordSysTransformation_4 = new CoordSysTransformation([300, 200], 10, [false, false]);
	var flag_4 = eq(coordSysTransformation_4.highToLow([0, 0]), [300, 200]) && eq(coordSysTransformation_4.highToLow([7, 2]), [230, 180]);

	return flag_1 && flag_2 && flag_3 && flag_4;
};
