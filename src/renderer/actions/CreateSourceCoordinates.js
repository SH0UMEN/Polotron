import Action from './Action'
import Keys from '../utils/Keys'

export default class CreateSourceCoordinates extends Action {
	points = [];

	constructor(layer) {
		super();
		this.canvas = layer.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.layer = layer;
	}

	activate() {
		if(!this.isActive()) {
			this.active = true;

			let body = document.querySelector('body');
			this.prevCursor = body.style.cursor;
			body.style.cursor = 'crosshair';

			this.boundSetPoint = this.setPoint.bind(this);
			this.boundOnKeyPress = this.onKeyPress.bind(this);
			window.addEventListener('keydown', this.boundOnKeyPress);
			window.addEventListener('click', this.boundSetPoint);
		}
	}

	setPoint(event) {
		if(event.target == this.canvas) {
			this.points.push([event.offsetX, event.offsetY]);
			this.ctx.beginPath();
			this.ctx.arc(event.offsetX, event.offsetY, 3, 0, 2*Math.PI);
			this.ctx.stroke();

			if(this.points.length == 2)
				this.deactivate();
		} else {
			this.deactivate();
		}
	}

	onKeyPress(event) {
		let isEsc = event.code == Keys.Esc;

		if(isEsc)
			this.deactivate(true);
	}

	deactivate(disableCallback) {
		if(this.isActive()) {
			this.active = false;
			let body = document.querySelector('body');
			body.style.cursor = this.prevCursor;
			window.removeEventListener('keydown', this.boundOnKeyPress);
			window.removeEventListener('click', this.boundSetPoint);

			this.layer.redraw();

			if(!disableCallback && this.deactivateCallback)
				this.deactivateCallback(this.points)
		}
	}
}