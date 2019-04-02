function TestRunner(groupings = [])
{
	this.groupings = groupings;
	this.grOK      = 0;
	this.grAll     = 0;
}

TestRunner.prototype.run = function ()
{
	var that = this;
	this.groupings.forEach(function (grouping) {that.processGrouping(grouping);}); // (grouping) => this.processGrouping(grouping)
	this.report();
};

TestRunner.prototype.processGrouping = function (grouping)
{
	function runModules(modules)
	{
		function andRun(flag, moduleConstructor) {return flag && (new moduleConstructor()).run();}
		return modules.reduce(andRun, true);
	}
	let flag = runModules(grouping.modules);
	document.getElementById(grouping.id).innerHTML = flag ? 'OK' : 'Wrong';
	this.count(flag);
}

TestRunner.prototype.count = function (flag)
{
	if (flag) this.grOK++;
	this.grAll++;
}

TestRunner.prototype.report = function () {console.log('' + this.grOK + '/' + this.grAll + '');}
