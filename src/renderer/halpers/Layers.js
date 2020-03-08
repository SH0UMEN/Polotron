let g2 = require('gradient2'),
    fs = require('fs'),
    path = require('path');

export class Layer {
    constructor(title, filename, type, data) {
        this.title = title;
        this.filename = filename;
        this.type = type;
        this.data = data;
    }
}

export class DEM extends Layer {
    Nx; Ny; Zmin; Zmax; Xmin; Xmax; Ymin; Ymax;

    static props = {
        filename: {
            input: "file",
            text: "",
            value: "",
        },
        title: {
            input: "text",
            value: ""
        },
        palette: {
            input: "palette",
            value: []
        },
    };

    draw(canvas) {
        this.canvas = canvas;

        let grad = new g2({
            colors: ['#00a300', '#ff0', '#f00'],
            steps: levels,
            model: 'rgb'
        });

        grad = grad.toArray('rgb');

        this.canvas.width = this.Nx;
        this.canvas.height = this.Ny;

        let h = (this.Zmax - this.Zmin) / levels,
            count = 0,
            zLevels = [];

        for (let i = 1; i < levels + 1; i++) {
            zLevels[i - 1] = this.Zmin + (h * i);
        }

        let ctx = this.canvas.getContext('2d'),
            imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);

        for(let y = 0; y < this.Ny; y++) {
            for(let x = 0; x < this.Nx; x++) {
                for (let level = 0; level < levels; level++) {
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
    }

    static readSource(name, filename) {
        let shortBuffer  = Buffer.alloc(2),
            doubleBuffer = Buffer.alloc(8);

        let Nx, Ny, Zmin, Zmax, Xmin, Xmax, Ymin, Ymax, data = [];

        return new Promise((resolve, reject) => {
            fs.open(filename, 'r', (err, f) => {
                if(err) {
                    reject(err);
                } else {
                    fs.readSync(f, shortBuffer, 0, 2, 4);
                    Nx = shortBuffer.readUInt16LE(0);
                    fs.readSync(f, shortBuffer, 0, 2, 6);
                    Ny = shortBuffer.readUInt16LE(0);

                    fs.readSync(f, doubleBuffer, 0, 8, 8);
                    Xmin = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 16);
                    Xmax = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 24);
                    Ymin = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 32);
                    Ymax = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 40);
                    Zmin = doubleBuffer.readDoubleLE(0);
                    fs.readSync(f, doubleBuffer, 0, 8, 48);
                    Zmax = doubleBuffer.readDoubleLE(0);

                    let count = 0,
                        arrayBuffer = Buffer.alloc(4*Ny*Nx);

                    fs.readSync(f, arrayBuffer, 0, 4*Ny*Nx, 56);

                    for(let y = Ny-1; y > -1; y--) {
                        let row = [];

                        for(let x = 0; x < Nx; x++) {
                            row.push(arrayBuffer.readFloatLE(4*count));
                            count++;
                        }
                        data.push(row);
                    }

                    fs.close(f)

                    resolve(new DEM(name, filename, 'GRD', data));
                }
            });
        })
    }
}