function UniqueIdder(aDocument) {this.document = aDocument;}

UniqueIdder.prototype.generateIdUnique = function ()
{
	function toId(n) {return 'id_' + n + '';}
	for (var i = 0; this.document.getElementById(toId(i)) !== null; i++);
	return toId(i);
};
