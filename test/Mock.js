function Mock() {this.communication = [];}

Mock.prototype.track = function (name, args, result) {this.communication.push({name: name, args: args, result: result});};
