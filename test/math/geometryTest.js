function testGeometryTest() {return testAreConvex() && testIsConvex() && testAngleMod() && testLineSide() && testEdgeVector() && testAreConvexVectors() && testAreConcaveVectors();}


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
