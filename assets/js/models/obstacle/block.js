class Block extends Obstacle {
  constructor(context, positionX, positionY, width, height, image) {
    super(context, positionX, positionY, width, height, image);
    this.velocityX = OBSTACLE_VELOCITY;
  }

  move() {
    this.positionX -= this.velocityX;
  }
}