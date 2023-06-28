class Background extends animatedSprite {
  constructor(context, positionX = 0, positionY = 0) {
    super(context, positionX, positionY, context.canvas.width, context.canvas.height, "/assets/images/background.png");
  }

  move() {
    this.positionX -= BACKGROUND_IMAGE_SPEED_MODE;
    if (this.positionX < -this.width) {
      this.positionX = this.width - 1;
    }
  }
}