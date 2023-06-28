class Rectangle extends Obstacle {
  constructor(context) {
    super(context, context.canvas.width - 150, context.canvas.height - HEIGHT_FLOOR, WIDTH_OBSTACLE, HEIGHT_OBSTACLE, "/assets/images/block.png");
    this.velocityX = OBSTACLE_VELOCITY;
  }

  move() {
    this.positionX -= this.velocityX;
  }
}