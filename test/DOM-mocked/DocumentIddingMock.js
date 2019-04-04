function DocumentIddingMock(ids = [])
{
	Mock.call(this);
	this.ids = ids;
}

DocumentIddingMock.prototype = Object.create(Mock.prototype); // @TODO : it is a module import order dependence: Mock must be loaded into `index.html` before `DocumentIddingMock`

DocumentIddingMock.prototype.constructor = DocumentIddingMock;

DocumentIddingMock.prototype.getElementById = function (id)
{
	var result = this.ids.includes(id) ? {} : null; // @TODO make it portable by own implmentation
	this.track('getElementById', [id], result);
	return result;
};
