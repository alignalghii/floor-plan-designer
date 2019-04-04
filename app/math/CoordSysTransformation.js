function CoordSysTransformation(lowOrigin, scalingFactor_hl, signPreserving)
{
	this.lowOrigin        = lowOrigin;
	this.scalingFactor_hl = scalingFactor_hl;
	this.signPreserving   = signPreserving;
}

CoordSysTransformation.prototype.lowToHigh = function ([lowX, lowY])
{
	var scaleX = this.scalingFactor_hl * (this.signPreserving[0] ? 1 : -1);
	var scaleY = this.scalingFactor_hl * (this.signPreserving[1] ? 1 : -1);
	return [(lowX - this.lowOrigin[0]) / scaleX , (lowY - this.lowOrigin[1]) / scaleY];
};


CoordSysTransformation.prototype.highToLow = function ([highX, highY])
{
	var scaleX = this.scalingFactor_hl * (this.signPreserving[0] ? 1 : -1);
	var scaleY = this.scalingFactor_hl * (this.signPreserving[1] ? 1 : -1);
	return [this.lowOrigin[0] + scaleX * highX, this.lowOrigin[1] + scaleY * highY];
};
