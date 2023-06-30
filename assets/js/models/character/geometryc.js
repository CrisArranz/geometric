class Geometryc extends animatedSprite {
  constructor(context) {
    super(context, GEOMETRYC_START_POSITION, context.canvas.height - HEIGHT_FLOOR, WIDTH_GEOMETRIC, HEIGHT_GEOMETRIC, "/assets/images/character.png");
    this.positionY0 = context.canvas.height - HEIGHT_FLOOR;
    this.gravity = 1;
    this.velocityY = 0;
  }

  move() {
    this.velocityY += this.gravity;
    this.positionY += this.velocityY;

    if (this.positionY > this.positionY0) {
      this.positionY = this.positionY0;
    }
  }

  onKeyDown() {
    if (this.positionY === this.positionY0) {
      this.velocityY = -JUMP_VELOCITY;
    }
  }

  onKeyUp() {
    this.velocityY = 0;
  }
}