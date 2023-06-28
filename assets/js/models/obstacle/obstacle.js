class Obstacle extends animatedSprite {
  constructor(context, positionX, positionY, image) {
    super(context, positionX, positionY, context.canvas.width, HEIGHT_FLOOR, image);
  }
}