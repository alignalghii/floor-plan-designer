function GeometryPolygonTest(nOK = 0, nAll = 0) {Test.call(this, nOK, nAll);}

GeometryPolygonTest.prototype = Object.create(Test.prototype);

GeometryPolygonTest.prototype.constructor = GeometryPolygonTest;


GeometryPolygonTest.prototype.testCollides = function()
{
	return	 collides([ [4,-2], [3, 2], [2,-1]], poly1_convex_ccw) &&
		!collides([ [4,-4], [3, 0], [2,-3]], poly1_convex_ccw) &&
		 collides([[ 3,-2], [2, 2], [1,-1]], poly1_convex_ccw) &&
		 collides([[-1, 5], [1, 4], [2, 7]], poly1_convex_ccw) && // OK but out of wrong cause
		!collides([[ 0, 4], [1, 4], [2, 7]], poly1_convex_ccw) ;  // !!! :(
}

GeometryPolygonTest.prototype.testCollidesTowards = function()
{
	return	 collidesTowards([[4,-2], [3,2], [2,-1]], poly1_convex_ccw) &&
		!collidesTowards(poly1_convex_ccw, [[4,-2], [3,2], [2,-1]]) &&

		!collidesTowards([[4,-4], [3,0], [2,-3]], poly1_convex_ccw) &&
		!collidesTowards(poly1_convex_ccw, [[4,-4], [3,0], [2,-3]]) &&

		 collidesTowards([[3,-2], [2,2], [1,-1]], poly1_convex_ccw) &&
		 collidesTowards(poly1_convex_ccw, [[3,-2], [2,2], [1,-1]]) &&

		!collidesTowards([[-1,5], [1,4], [2,7]], poly1_convex_ccw) && // !!! :(
		 collidesTowards(poly1_convex_ccw, [[-1,5], [1,4], [2,7]]) &&

		!collidesTowards([[ 0,4], [1,4], [2,7]], poly1_convex_ccw) && // !!! :(
		!collidesTowards(poly1_convex_ccw, [[ 0,4], [1,4], [2,7]]) ;  // !!! :(
}

GeometryPolygonTest.prototype.testAsciiGraphics = function()
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


GeometryPolygonTest.prototype.testInside_series_convex_ccw = function()
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


GeometryPolygonTest.prototype.testInside_series_convex_cw = function()
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


GeometryPolygonTest.prototype.testInside_series_degen_ccw = function()
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

GeometryPolygonTest.prototype.testInside_series_degen_cw = function()
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


GeometryPolygonTest.prototype.testInside_series_concave_ccw = function()
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


GeometryPolygonTest.prototype.testInside_series_concave_cw = function()
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


GeometryPolygonTest.prototype.testInside_convex_ccw = function()
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

GeometryPolygonTest.prototype.testInside_convex_cw = function()
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

GeometryPolygonTest.prototype.testInside_concave_ccw = function()
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

GeometryPolygonTest.prototype.testInside_concave_cw = function()
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


GeometryPolygonTest.prototype.testSignedRotAngleSumWhenToured = function()
{
	return	cca(signedRotAngleSumWhenToured([[0, 0], [2, 1], [0, 4]]),  360) &&
		cca(signedRotAngleSumWhenToured([[0, 0], [0, 4], [2, 1]]), -360) ;
}

GeometryPolygonTest.prototype.testAngleSumWhenToured = function()
{
	return	cca(angleSumWhenToured([[0, 0], [2, 1], [0, 4]]), 360) &&
		cca(angleSumWhenToured([[0, 0], [0, 4], [2, 1]]), 360) ;
}


GeometryPolygonTest.prototype.testAngleTyper_dependent = function()
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

GeometryPolygonTest.prototype.testAngleTyper = function()
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


GeometryPolygonTest.prototype.testExecuteTree = function()
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


GeometryPolygonTest.prototype.testSubsequencerRolled = function()
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

GeometryPolygonTest.prototype.testSubsequencer = function()
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

GeometryPolygonTest.prototype.testRollToJoin = function()
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


GeometryPolygonTest.prototype.testAreConvexDirectedEdges = function()
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

GeometryPolygonTest.prototype.testAreConcaveDirectedEdges = function()
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

GeometryPolygonTest.prototype.testAngleOfEdges = function()
{
	return	angleOfEdges([[1, 2], [1, 3]], [[5, 7], [5, 12]]) ==   0 &&
		angleOfEdges([[2, 1], [2, 3]], [[5, 7], [5, 12]]) ==   0 &&
		angleOfEdges([[1, 2], [3, 2]], [[5, 7], [5, 12]]) ==  90 &&
		angleOfEdges([[1, 2], [4, 5]], [[5, 7], [4,  8]]) ==  90 &&
		angleOfEdges([[2, 1], [4, 4]], [[5, 2], [1, -4]]) == 180 ;
}





GeometryPolygonTest.prototype.testSectionSide = function()
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
