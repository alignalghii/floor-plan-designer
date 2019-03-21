/*******************************
 * Canvas: @TODO dependency injection for `inside`
 *******************************/

function graphics(ctx, x0, y0, x1, y1, figure, step, o1, o2, fillStyle)
{
	ctx.fillStyle = fillStyle;
	for (var x = x0; x <= x1; x+=1/step) {
		for (var y = y0; y <= y1; y+=1/step) {
			var pixel = inside([x, y], figure);
			if (pixel) ctx.fillRect(o1+step*x, o2-step*y, 1, 1);
		}
	}
}


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
