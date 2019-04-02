function Test(nOK = 0, nAll = 0)
{
	this.nOK  = nOK;
	this.nAll = nAll;
}

Test.prototype.run = function()
{
	var allFlag = true;
	for (let testMethodName in this) {
		if (/^test[a-zA-Z0-9_]+/.test(testMethodName)) {
			flag = this[testMethodName]();
			allFlag = allFlag && flag;
			if (flag) this.nOK++;
			this.nAll++;
		}
	}
	return allFlag;
};

Test.prototype.report = function () {return [this.nOK, this.nAll];};
