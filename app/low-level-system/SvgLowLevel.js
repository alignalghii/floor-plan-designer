const svgNS = 'http://www.w3.org/2000/svg';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';
//svg.setAttributeNS(xmlns, 'xmlns'      , svgNS);
//svg.setAttributeNS(xmlns, 'xmlns:xlink', xlink);


function SvgLowLevel(svgWidth, svgHeight)
{
	this.svgRootElement = createElementWithAttributes('svg' , {id:'screen', width:svgWidth, height:svgHeight}, svgNS);
	this.svgPoint       = this.svgRootElement.createSVGPoint();
};

SvgLowLevel.prototype.eventPosition = function (event)
{
	this.svgPoint.x = event.clientX;
	this.svgPoint.y = event.clientY;
	var showPoint   = this.svgPoint.matrixTransform(this.svgRootElement.getScreenCTM().inverse());
	return [showPoint.x, showPoint.y];
};

SvgLowLevel.prototype.style = function (id, property, value)
{
	svgFigureElement = document.getElementById(id);
	svgFigureElement.style[property] = value;
};



SvgLowLevel.prototype.makeOrUpdateFigureElement = function (id, svgVertices, svgProperties)
{
	var figureElement = document.getElementById(id);
	if (!figureElement) {
		figureElement = document.createElementNS(svgNS, 'polygon');
		figureElement.id = id;
		this.svgRootElement.appendChild(figureElement);
	}
	var points   = pointsArgValue(svgVertices);
	figureElement.setAttribute('points', points);
	for (var key in svgProperties) {
		if (svgProperties.hasOwnProperty(key)) {
			figureElement.setAttribute(key, svgProperties[key]);
		}
	}
};

function pointsArgValue(svgVertices) {return svgVertices.map(stringifyPositionWithComma).join(' ');}
/**
 * We need this function:
 * Although `Array.prototype.join.call([12,7])` --> `"12,7"`, but `Array.prototype.join.call` is not a callback, cannot go higher.order!
 */
function stringifyPositionWithComma([x, y]) {return '' + x + ',' + y + '';}

SvgLowLevel.prototype.mount = function() {document.body.appendChild(this.svgRootElement);};
