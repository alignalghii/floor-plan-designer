function UniqueIdderTest(nOK = 0, nAll = 0) {Test.call(this, nOK, nAll);}

UniqueIdderTest.prototype = Object.create(Test.prototype);

UniqueIdderTest.prototype.constructor = UniqueIdderTest;

UniqueIdderTest.prototype.assertResultAndCommunication = function (ids, result, communication)
{
	var documentMock = new DocumentIddingMock(ids);
	var uniqueIdder  = new UniqueIdder(documentMock);
	var flag_init          = eq(documentMock.communication, []);
	var flag_result        = uniqueIdder.generateIdUnique() == result;
	var flag_communication = eq(documentMock.communication, communication);
	return flag_init && flag_result && flag_communication;
};

UniqueIdderTest.prototype.testGenerateIdUnique = function ()
{
	var flag_    = this.assertResultAndCommunication([], 'id_0', [
			{name: 'getElementById', args: ['id_0'], result: null}
	]);
	var flag_0   = this.assertResultAndCommunication(['id_0'], 'id_1', [
			{name: 'getElementById', args: ['id_0'], result: {}  },
			{name: 'getElementById', args: ['id_1'], result: null}
	]);
	var flag_01  = this.assertResultAndCommunication(['id_0', 'id_1'], 'id_2', [
			{name: 'getElementById', args: ['id_0'], result: {}  },
			{name: 'getElementById', args: ['id_1'], result: {}  },
			{name: 'getElementById', args: ['id_2'], result: null}
	]);
	var flag_012 = this.assertResultAndCommunication(['id_0', 'id_1', 'id_2'], 'id_3', [
			{name: 'getElementById', args: ['id_0'], result: {}  },
			{name: 'getElementById', args: ['id_1'], result: {}  },
			{name: 'getElementById', args: ['id_2'], result: {}  },
			{name: 'getElementById', args: ['id_3'], result: null}
	]);
	return flag_ && flag_0 && flag_01 && flag_012;
};
