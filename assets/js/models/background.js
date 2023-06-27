class Background extends animatedSprite {
  constructor(context) {
    super(context, 0, 0, context.canvas.width * 2, context.canvas.height, "/assets/images/background.png")
  }

  move() {
    this.positionX -= BACKGROUND_IMAGE_SPEED_MODE;
  }
}