const fs = require('fs');

export class Source {
	static export(filename, sources) {
		let data = '';

		for(let i = 0; i < sources.length; i++) {
			data += sources[i].angle + '\n';

			let x_min = Math.min(sources[i].points[0][0], sources[i].points[1][0]);
			let x_max = Math.max(sources[i].points[0][0], sources[i].points[1][0]);
			let y_min = Math.min(sources[i].points[0][1], sources[i].points[1][1]);
			let y_max = Math.max(sources[i].points[0][1], sources[i].points[1][1]);

			data += x_min + '\n';
			data += x_max + '\n';
			data += y_min + '\n';
			data += y_max;

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