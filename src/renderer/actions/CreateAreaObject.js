import Action from './Action'
import Keys from '../utils/Keys'

export default class CreateAreaObject extends Action {
    boundSetPoint = null;
    boundOnKeyPress = null;
    boundCreateArea = null;
    canvas = null;
    layer = null;
    ctx = null;
    active = false;
    prevCursor = null;
    points = [];
    z = 0;
    isChange = true;

    origin = null;

    constructor(canvas, layer, z) {
        super();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.layer = layer;
        this.z = z;
    }

    activate() {
        if(!this.isActive()) {
            this.active = true;

            let body = document.querySelector('body');
            this.prevCursor = body.style.cursor;
            body.style.cursor = 'crosshair';

            this.boundCreateArea = this.createArea.bind(this);
            this.boundSetPoint = this.setPoint.bind(this);
            this.boundOnKeyPress = this.onKeyPress.bind(this);
            window.addEventListener('click', this.boundSetPoint);
            window.addEventListener('dblclick', this.boundCreateArea);
            window.addEventListener('keypress', this.boundOnKeyPress);
        }
    }

    createArea(event) {
        this.deactivate();
        event.stopPropagation();
        event.preventDefault();

        let len = this.points.length;

        if(len < 3)
            return

        this.rememberSquareValues();

        for(let i = 0; i < len-1; i++) {
            this.bresenham(this.points[i][0], this.points[i][1], this.points[i+1][0], this.points[i+1][1], this.z);
        }

        this.bresenham(this.points[len-1][0], this.points[len-1][1], this.points[0][0], this.points[0][1], this.z);
        let centerPoint = this.calculateCenter();
        this.fill(centerPoint[0], centerPoint[1], this.z);
        this.layer.redraw();
    }

    calculateCenter() {
        let xc = 0, yc = 0, point, len = this.points.length;

        for(point of this.points) {
            xc += point[0];
            yc += point[1];
        }

        xc /= len;
        yc /= len;

        return [Math.round(xc), Math.round(yc)];
    }

    fill(x, y, z, blockUp, blockDown) {
        let data = this.layer.data,
            yOrigin = y,
            xOrigin = x,
            curPixel = data[y][x];

        while(curPixel != z) {
            data[y][x] = z;

            if(!blockUp && data[y+1][x] != z) {
                this.fill(x, y+1, z, false, true);
            }

            if(!blockDown && data[y-1][x] != z) {
                this.fill(x, y-1, z, true, false);
            }

            x++;
            curPixel = data[y][x];
        }

        x = xOrigin-1;
        y = yOrigin;
        curPixel = data[y][x];


        while(curPixel != z) {
            data[y][x] = z;

            if(!blockUp && data[y+1][x] != z) {
                this.fill(x, y+1, z, false, true);
            }

            if(!blockDown && data[y-1][x] != z) {
                this.fill(x, y-1, z, true, false);
            }

            x--;
            curPixel = data[y][x];
        }
    }

    bresenham(x1, y1, x2, y2, z) {
        var deltaX = Math.abs(x2 - x1);
        var deltaY = Math.abs(y2 - y1);
        var signX = x1 < x2 ? 1 : -1;
        var signY = y1 < y2 ? 1 : -1;
        var error = deltaX - deltaY;

        this.layer.data[y2][x2] = z;

        while(x1 != x2 || y1 != y2) {
            this.layer.data[y1][x1] = z;
            var error2 = error * 2;

            if(error2 > -deltaY) {
                error -= deltaY;
                x1 += signX;
            }

            if(error2 < deltaX) {
                error += deltaX;
                y1 += signY;
            }
        }
    }

    rememberSquareValues() {
        this.minLeft = this.layer.data[0].length-1;
        this.maxLeft = 0;
        this.minTop = this.layer.data.length-1;
        this.maxTop = 0;

        for(var point of this.points) {
            this.minLeft = Math.min(point[0], this.minLeft);
            this.maxLeft = Math.max(point[0], this.maxLeft);
            this.minTop = Math.min(point[1], this.minTop);
            this.maxTop = Math.max(point[1], this.maxTop);
        }

        this.origin = this.getSquare();
    }

    getSquare() {
        let res = [];

        for(var i = this.minTop; i <= this.maxTop; i++)
            res.push(this.layer.data[i].slice(this.minLeft, this.maxLeft+1));

        return res;
    }

    swapSquare(square) {
        for(var i = this.minTop; i <= this.maxTop; i++)
            this.layer.data[i].splice(this.minLeft, this.maxLeft - this.minLeft + 1, ...square[i-this.minTop]);
    }

    setPoint(event) {
        if(event.target == this.canvas) {
            this.points.push([event.offsetX, event.offsetY]);
            this.ctx.beginPath();
            this.ctx.arc(event.offsetX, event.offsetY, 3, 0, 2*Math.PI);
            this.ctx.stroke();
        } else {
            this.deactivate();
        }
    }

    deactivate() {
        if(this.isActive()) {
            this.active = false;
            let body = document.querySelector('body');
            body.style.cursor = this.prevCursor;
            window.removeEventListener('keypress', this.boundOnKeyPress);
            window.removeEventListener('click', this.boundSetPoint);
            window.removeEventListener('dblclick', this.boundCreateArea);

            super.deactivate();
        }
    }

    isActive() {
        return this.active
    }

    onKeyPress(event) {
        let isZ = event.code == Keys.Z;

        console.log('1');
    }

    undoRedo() {
        var origin = this.getSquare();
        this.swapSquare(this.origin);
        this.origin = origin;
        this.layer.redraw();
    }

    undo() {
        this.undoRedo();
    }

    redo() {
        this.undoRedo();
    }
}