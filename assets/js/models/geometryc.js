class Geometryc extends animatedSprite {
  constructor(context) {
    super(context, GEOMETRYC_START_POSITION, context.canvas.height - HEIGHT_FLOOR, WIDTH_GEOMETRIC, HEIGHT_GEOMETRIC, "/assets/images/character.png");
    this.gravity = 1;
    this.velocityY = 0;
  }

  move() {
    this.velocityY += this.gravity;
    this.positionY += this.velocityY;

    if (this.positionY > this.context.canvas.height - HEIGHT_FLOOR) {
      this.positionY = this.context.canvas.height - HEIGHT_FLOOR;
    }
  }

  onKeyDown() {
    if (this.positionY === this.context.canvas.height - HEIGHT_FLOOR) {
      this.velocityY = -20;
    }
  }

  onKeyUp() {
    this.velocityY = 0;
  }
}