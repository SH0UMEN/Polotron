export default class Line {
    placement;
    phase = 0;

    constructor(placement, color) {
        this.color = color;
        this.placement = placement;
        this.phase = Math.random();
    }

    draw(ctx) {
        let gradient = ctx.createLinearGradient(this.placement[0], this.placement[1], this.placement[2], this.placement[3]);
        let color = `rgba(255, 255, 255, ${ this.phase < 0.5 ? this.phase :
            this.phase > 0.5 ? 1 - this.phase :
                1})`;
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(this.phase > 1 ? 1 : this.phase, "transparent");
        gradient.addColorStop(this.phase + 0.18 > 1 ? 1 : this.phase + 0.18, color);
        gradient.addColorStop(this.phase + 0.2 > 1 ? 1 : this.phase + 0.2, color);
        gradient.addColorStop(this.phase + 0.2001 > 1 ? 1 : this.phase + 0.2001, "transparent");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.placement[0], this.placement[1]);
        ctx.lineTo(this.placement[2], this.placement[3]);
        ctx.stroke();

        if(this.phase >= 1) {
            this.phase = 0
        } else {
            this.phase+=0.005
        }
    }
}