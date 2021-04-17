const fs = require('fs');

export class Source {
	static export(filename, sources) {
		let data = '';

		for(let i = 0; i < sources.length; i++) {
			data += sources[i].angle + '\n';
			data += sources[i].points[0][0] + '\n';
			data += sources[i].points[1][0] + '\n';
			data += sources[i].points[0][1] + '\n';
			data += sources[i].points[1][1];

			if(i < sources.length-1)
				data += '\n';
		}

		fs.writeFileSync(filename, data);
	}

	constructor(title, points, angle) {
		this.title = title;
		this.points = points;
		this.angle = angle;
	}

	getPoints() {
		return this.points;
	}

	getAngle() {
		return this.angle;
	}

	getTitle() {
		return this.title;
	}
}