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
