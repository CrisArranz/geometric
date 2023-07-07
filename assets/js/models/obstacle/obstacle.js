class Obstacle extends animatedSprite {
  constructor(context, positionX, positionY, width, height, image) {
    super(context, positionX, positionY, width, height, image);
    this.velocityX = OBSTACLE_VELOCITY;
  }

  move() {
    this.positionX -= this.velocityX;
  }

  isVisible() {
    return this.positionX < this.context.canvas.width && this.positionX > 0 - this.width;
  }
}