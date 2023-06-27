class Geometryc{
  constructor(context) {
    this.context = context;
    this.positionX = 35;
    this.positionY = this.context.canvas.height - 120;

    this.width = WIDTH_GEOMETRIC;
    this.height = HEIGHT_GEOMETRIC;

    this.gravity = 1;

    this.velocityY = 0;
  }

  draw() {
    this.context.fillRect(this.positionX, this.positionY, this.width, this.height);
    this.context.beginPath();
    this.context.moveTo(500, this.positionY + 50);
    this.context.lineTo(460, this.positionY + this.width);
    this.context.lineTo(540, this.positionY + this.width);
    this.context.closePath();

    // the fill color
    this.context.fillStyle = "#FFCC00";
    this.context.fill();
  }

  move() {
    this.velocityY += this.gravity;
    this.positionY += this.velocityY;

    if (this.positionY > this.context.canvas.height - 120) {
      this.positionY = this.context.canvas.height - 120;
    }
  }

  onKeyDown() {
    if (this.positionY === this.context.canvas.height - 120) {
      this.velocityY = -20;
    }
  }

  onKeyUp() {
    this.velocityY = 0;
  }
}