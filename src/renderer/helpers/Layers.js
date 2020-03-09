let g2 = require('gradient2'),
    fs = require('fs'),
    path = require('path');

export class Layer {
    isDrawed = false;

    constructor(title, filename, type) {
        this.title = title;
        this.filename = filename;
        this.type = type;
    }

    bindCanvas(canvas) {
        this.canvas = canvas
    }
}

export class DEM extends Layer {
    Nx; Ny; Zmin; Zmax; Xmin; Xmax; Ymin; Ymax; data = [];

    constructor(title, filename, type, levels) {
        super(title, filename, type);
        this.levels = levels;
    }

    draw() {
        let grad = new g2({
            colors: ['#00a300', '#ff0', '#f00'],
            steps: this.levels,
            model: 'rgb'
        });

        grad = grad.toArray('rgb');

        this.canvas.width = this.Nx;
        this.canvas.height = this.Ny;

        let h = (this.Zmax - this.Zmin) / this.levels,
            count = 0,
            zLevels = [];

        for (let i = 1; i < this.levels + 1; i++) {
            zLevels[i - 1] = this.Zmin + (h * i);
        }

        let ctx = this.canvas.getContext('2d'),
            imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height),
            data = imageData.data;

        for(let y = 0; y < this.Ny; y++) {
            for(let x = 0; x < this.Nx; x++) {
                for (let level = 0; level < this.levels; level++) {
                    if (this.data[y][x] <= zLevels[level]) {
                        data[4*count] = grad[level].color[0];
                        data[1+(4*count)] = grad[level].color[1];
                        data[2+(4*count)] = grad[level].color[2];
                        data[3+(4*count)] = 255;
                        break;
                    }
                }

                count++;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        this.isDrawed = true;
    }

    read() {
        let shortBuffer  = Buffer.alloc(2),
            doubleBuffer = Buffer.alloc(8);

        return new Promise((resolve, reject) => {
            fs.open(this.filename, 'r', (err, f) => {
                if(err) {
                    reject(err);
                } else {
                    fs.readSync(f, shortBuffer, 0, 2, 4);
                    this.Nx = shortBuffer.readUInt16LE(0);
                    fs.readSync(f, shortBuffer, 0, 2, 6);
                    this.Ny = shortBuffer.readUInt16LE(0);

                    fs.readSync(f, doubleBuffer, 0, 8, 8);
                    this.Xmin = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 16);
                    this.Xmax = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 24);
                    this.Ymin = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 32);
                    this.Ymax = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 40);
                    this.Zmin = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 48);
                    this.Zmax = doubleBuffer.readDoubleLE(0);

                    let count = 0,
                        arrayBuffer = Buffer.alloc(4*this.Ny*this.Nx);

                    fs.readSync(f, arrayBuffer, 0, 4*this.Ny*this.Nx, 56);

                    for(let y = this.Ny-1; y > -1; y--) {
                        let row = [];

                        for(let x = 0; x < this.Nx; x++) {
                            row.push(arrayBuffer.readFloatLE(4*count));
                            count++;
                        }
                        this.data.push(row);
                    }

                    fs.close(f)

                    arrayBuffer = doubleBuffer = shortBuffer = null;
                    resolve(true);
                }
            });
        })
    }
}