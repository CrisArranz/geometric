class Rectangle extends Obstacle {
  constructor(context, positionX) {
    super(context, positionX, context.canvas.height - HEIGHT_FLOOR - HEIGHT_GEOMETRIC, WIDTH_RECTANGLE_OBSTACLE, HEIGHT_RECTANGLE_OBSTACLE, "/assets/images/rectangle.png");
    this.velocityX = OBSTACLE_VELOCITY;
  }

  move() {
    this.positionX -= this.velocityX;
  }

  checkCollision(player) {
    const collisionLeft = this.positionX < player.positionX + player.width;
    const collisionRight = this.positionX + this.width > player.positionX;
    const collisionUp = this.positionY <= player.positionY + player.height;
    const collisionDown = this.positionY + this.height > player.positionY;
    if (collisionLeft && collisionRight && collisionUp && collisionDown) {
      if (this.positionY >= (player.positionY + player.height) - PIXEL_VARIANT || this.positionY === player.positionY + player.height) {
        player.positionY0 = this.positionY - player.height;
        return false;
      }
      return true;
    }
    player.positionY0 = this.context.canvas.height - HEIGHT_FLOOR
    return false;
  }
}