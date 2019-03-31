function Router(object, routes)
{
	this.object = object;
	this.routes = routes;
}

Router.prototype.dispatch = function (event) // @TODO standalone Router class, of course add a new argument for the runner object, and maybe also the event
{
	target = event.target.id;
	for (var pattern in this.routes) {
		if (this.routes.hasOwnProperty(pattern)) {
			var regExp = new RegExp(pattern);
			if (regExp.test(target)) {
				this.routes[pattern].call(this.object, event);
				break;
			}
		}
	}
};
