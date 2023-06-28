class Picasso {
  constructor(context, positionX, positionY, width, height, image) {
    this.context = context;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;
    this.image.onload = () => {
      this.image.isReady = true;
    }
  }

  draw() {
    if (this.image.isReady) {
      this.context.drawImage(
        this.image,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  }
}