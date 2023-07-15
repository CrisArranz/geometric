class Geometryc extends animatedSprite {
  constructor(context) {
    super(context, GEOMETRYC_START_POSITION, context.canvas.height - HEIGHT_FLOOR, WIDTH_GEOMETRIC, HEIGHT_GEOMETRIC, "./assets/images/character.png");
    this.positionY0 = context.canvas.height - HEIGHT_FLOOR;
    this.gravity = GRAVITY;
    this.velocityY = 0;
    this.canJump = true;
  }

  move() {
    this.velocityY += this.gravity;
    this.positionY += this.velocityY;

    if (this.positionY > this.positionY0) {
      this.positionY = this.positionY0;
      this.velocityY = 0;
      this.canJump = true;
    }
  }

  onKeyDown() {
    if (this.canJump) {
      this.velocityY = -JUMP_VELOCITY;
      this.canJump = false;
    }
  }

  onKeyUp() {
    this.velocityY = 0;
  }

  checkCollision(obstacle) {
    const collisionLeft = obstacle.positionX < this.positionX + this.width;
    const collisionRight = obstacle.positionX + obstacle.width > this.positionX;
    const collisionUp = obstacle.positionY <= this.positionY + this.height;
    const collisionDown = obstacle.positionY + obstacle.height > this.positionY;

    if (collisionLeft && collisionRight && collisionUp && collisionDown) {
      if ((obstacle.positionY >= (this.positionY + this.height) - PIXEL_VARIANT || obstacle.positionY === this.positionY + this.height) && obstacle instanceof Block) {
        this.positionY0 = obstacle.positionY - this.height;
        this.velocityY = 0;
        this.canJump = true;
        return false;
      }
      return true;
    }
    if (obstacle.positionX + obstacle.width < this.positionX) {
      this.positionY0 = this.context.canvas.height - HEIGHT_FLOOR;
    }
    return false;
  }
}