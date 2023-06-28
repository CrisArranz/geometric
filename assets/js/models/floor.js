class Floor extends animatedSprite {
  constructor(context, positionX = 0, positionY = 0){
    super(context, positionX, positionY, context.canvas.width, HEIGHT_FLOOR, "/assets/images/floor.png");
  }

  move() {
    this.positionX -= FLOOR_IMAGE_SPEED_MODE;
    if (this.positionX < -this.width) {
      this.positionX = this.width - 2;
    }
  }
}