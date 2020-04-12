let g2 = require('gradient2'),
    fs = require('fs'),
    path = require('path');

import AnimatedLine from "./AnimatedVectors"

export class Layer {
    isDrawed = false;
    hidden = false;

    constructor(title, type) {
        this.title = title;
        this.type = type;
    }

    bindCanvas(canvas) {
        this.canvas = canvas
    }

    hide() {
        this.hidden = true;
    }

    show() {
        this.hidden = false
    }

    draw() {

    }

    destroy() {

    }

    read() {

    }

    readSync() {

    }
}

export class GRDVectorLayers extends Layer {
    vectors = []; Nx; Ny;
    drawing = false;
    lines = [];
    hMatrix; xMatrix; yMatrix; palette;

    constructor(title, h, x, y, palette) {
        super(title, "GRD-Animation");
        this.hMatrix = h;
        this.xMatrix = x;
        this.yMatrix = y;
        this.palette = palette;
    }

    bindCanvas(canvas) {
        super.bindCanvas(canvas);

        this.canvas.width = this.Nx;
        this.canvas.height = this.Ny;
        this.ctx = canvas.getContext('2d')
    }

    loop() {
        setInterval(()=>{
            if(this.drawing) {
                this.ctx.clearRect(0,0, this.Nx, this.Ny);

                for (let line of this.lines) {
                    line.draw(this.ctx)
                }
            }
        }, 30)
    }

    draw() {
        for(let vector of this.vectors) {
            this.lines.push(new AnimatedLine([vector[0], vector[1], vector[0]+vector[2], vector[1]+vector[3]], ''))
        }

        this.drawing = true;
        this.loop();
        this.isDrawed = true;
    }

    read() {
        return new Promise((resolve, reject) => {
            fs.open(this.hMatrix, 'r', (err, h) => {
                if(err) {
                    reject(err);
                } else {
                    fs.open(this.xMatrix, 'r', (err, x) => {
                        if(err) {
                            reject(err)
                        } else {
                            fs.open(this.yMatrix, 'r', (err, y) => {
                                if(err) {
                                    reject(err)
                                } else {
                                    let shortBuffer = Buffer.alloc(2);
                                    fs.readSync(h, shortBuffer, 0, 2, 4);
                                    this.Nx = shortBuffer.readUInt16LE(0);
                                    fs.readSync(h, shortBuffer, 0, 2, 6);
                                    this.Ny = shortBuffer.readUInt16LE(0);

                                    let count = 0,
                                        hBuffer = Buffer.alloc(4*this.Ny*this.Nx),
                                        xBuffer = Buffer.alloc(4*this.Ny*this.Nx),
                                        yBuffer = Buffer.alloc(4*this.Ny*this.Nx);

                                    fs.readSync(h, hBuffer, 0, 4*this.Ny*this.Nx, 56);
                                    fs.readSync(x, xBuffer, 0, 4*this.Ny*this.Nx, 56);
                                    fs.readSync(y, yBuffer, 0, 4*this.Ny*this.Nx, 56);

                                    for(let y = this.Ny-1; y > -1; y--) {
                                        if(y % 10 == 0) {
                                            for(let x = 0; x < this.Nx; x++) {
                                                if(x % 10 == 0) {
                                                    let h = hBuffer.readFloatLE(4*count);

                                                    if(h != 0) {
                                                        let Vx = xBuffer.readFloatLE(4*count),
                                                            Vy = yBuffer.readFloatLE(4*count);

                                                        this.vectors.push([x, y, Vx, Vy]);
                                                    }
                                                }
                                                count++;
                                            }
                                        } else {
                                            count+=this.Nx;
                                        }
                                    }


                                    fs.close(h);
                                    fs.close(x);
                                    fs.close(y);

                                    hBuffer = xBuffer = yBuffer = shortBuffer = null;

                                    resolve();
                                }
                            })
                        }
                    });
                }
            });
        });
    }
}

export class GRDAnimation extends Layer {
    drawing; frames = []; hidingFrames = [0, 0];

    set hiding(val) {
        for(let frame of this.frames) {
            frame.hiding = val
        }

        this.hidingFrames = val;
    }

    get hiding() {
        return this.hidingFrames;
    }

    constructor(title, filename, levels, clipping, palette) {
        super(title, "GRD-Animation");
        this.filename;
        this.levels = levels;
        this.clipping = clipping;
        this.palette = palette;
    }

    bindCanvas(canvas) {
        for(let frame of this.frames) {
            frame.bindCanvas(canvas);
        }
    }

    read() {
        return new Promise((resolve, reject) => {
            for(let file of this.filename) {
                let frame = new GRD(file, file, this.levels, this.clipping, this.palette);

                frame.readSync();
                this.frames.push(frame);
            }
            resolve();
        })
    }

    draw() {
        if(!this.isDrawed) {
            let g = this.frames.length,
                i = 0;

            this.drawing = setInterval(()=>{
                if(!this.hidden) {
                    this.frames[i].draw();
                    (i == g - 1) ? i = 0 : i++;
                }
            }, 400)

            this.isDrawed = true;
        }
    }

    destroy() {
        super.destroy();
        this.stopDrawing();
        this.frames = null;
    }

    stopDrawing() {
        this.isDrawed = false;
        clearInterval(this.drawing);
    }
}

export class GRD extends Layer {
    Nx; Ny; Zmin; Zmax; Xmin; Xmax; Ymin; Ymax; data = [];

    constructor(title, filename, levels, clipping, palette) {
        super(title, "GRD");
        this.filename = filename;
        this.levels = levels;
        this.clipping = clipping;
        this.palette = palette
    }

    draw() {
        let grad = new g2({
            colors: this.palette,
            steps: this.levels,
            model: 'rgb'
        });

        let tData = this.data.map(y=>y.map(x=>x)),
            percent = (this.Zmax - this.Zmin)/100,
            clipping = [this.clipping[0] == 0 ? this.Zmin : this.Zmin + this.clipping[0]*percent,
                        this.clipping[1] == 100 ? this.Zmax : this.Zmin + this.clipping[1]*percent];


        grad = grad.toArray('rgb');

        this.canvas.width = this.Nx;
        this.canvas.height = this.Ny;

        //Find new min and max
        let newZmin = this.Zmax, newZmax = this.Zmin;

        for(let y = 0; y < this.Ny; y++) {
            for(let x = 0; x < this.Nx; x++) {
                let cur = tData[y][x];
                if(cur < newZmin && cur >= clipping[0]) {
                    newZmin = cur;
                } else if(cur > newZmax && cur <= clipping[1]) {
                    newZmax = cur;
                }
            }
        }

        //Clipping
        for(let y = 0; y < this.Ny; y++) {
            for(let x = 0; x < this.Nx; x++) {
                let cur = tData[y][x];

                if(cur > newZmax) {
                    tData[y][x] = newZmax;
                } else if(cur < newZmin) {
                    tData[y][x] = newZmin;
                }
            }
        }

        let h = (newZmax - newZmin) / this.levels,
            count = 0,
            zLevels = [];

        for (let i = 1; i < this.levels + 1; i++) {
            zLevels[i - 1] = newZmin + (h * i);
        }

        let ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.Nx, this.Ny);

        let imageData = ctx.getImageData(0,0, this.Nx, this.Ny),
            data = imageData.data;

        //hiding

        let hiding = [this.hiding[0], this.hiding[1] == 0 ? this.Zmax : this.hiding[1]]

        for(let y = 0; y < this.Ny; y++) {
            for(let x = 0; x < this.Nx; x++) {
                //hide
                let cur = tData[y][x];
                if(cur >= hiding[0] && cur <= hiding[1]) {
                    for (let level = 0; level < this.levels; level++) {
                        if (cur <= zLevels[level]) {
                            data[4*count] = grad[level].color[0];
                            data[1+(4*count)] = grad[level].color[1];
                            data[2+(4*count)] = grad[level].color[2];
                            data[3+(4*count)] = 255;
                            break;
                        }
                    }
                } else {
                    data[4 * count] = 0;
                    data[1 + (4 * count)] = 0;
                    data[2 + (4 * count)] = 0;
                    data[3 + (4 * count)] = 0;
                }

                count++;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        this.isDrawed = true;
    }

    readSync(callback) {
        let shortBuffer  = Buffer.alloc(2),
            doubleBuffer = Buffer.alloc(8);

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

                    this.data[y] = row;
                }

                fs.close(f)

                this.hiding = [this.Zmin, this.Zmax];

                arrayBuffer = doubleBuffer = shortBuffer = null;

                callback ? callback() : ""
            }
        });
    }

    read() {
        return new Promise((resolve, reject) => {
            this.readSync(()=>{
                resolve(true);
            });
        })
    }
}