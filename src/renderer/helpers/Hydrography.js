const fs = require('fs');

export default class Hydrography {
	constructor(step, speed, count, workingTime, spendValues) {
		this.step = step;
		this.speed = speed;
		this.count = count;
		this.workingTime = workingTime;
		this.spendValues = spendValues;
	}

	getSpendValues() {
		return this.spendValues;
	}

	export(path) {
		let data = '';

		data += this.step + '\n';
		data += this.speed + '\n';
		data += this.count + '\n';
		data += this.workingTime + '\n';

		if(this.spendValues != null) {
			for(var i = 0; i < this.spendValues.length; i++) {
				for(var j = 0; j < this.spendValues[i].length; j++) {
					data += this.spendValues[i][j] + '\n';
				}
			}

			data = data.slice(0, -1);
		}

		fs.writeFileSync(path, data);
	}
}