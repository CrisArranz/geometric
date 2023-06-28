class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext("2d");

    this.geometryc = new Geometryc(this.context);
    this.firstBackground = new Background(this.context);
    this.secondBackground = new Background(this.context, this.context.canvas.width);
    this.firstFloor = new Floor(this.context, 0, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_GEOMETRIC);
    this.secondFloor = new Floor(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_GEOMETRIC);

    this.framePerSecond = 60;
    this.intervalId = null;
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, 1000 / this.framePerSecond)
    }
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null;
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  move () {
    this.firstBackground.move();
    this.secondBackground.move();
    this.firstFloor.move();
    this.secondFloor.move();
    this.geometryc.move();
  }

  draw() {
    this.firstBackground.draw();
    this.secondBackground.draw();
    this.firstFloor.draw();
    this.secondFloor.draw();
    this.geometryc.draw();
  }

  onKeyDown() {
    this.geometryc.onKeyDown();
  }
}