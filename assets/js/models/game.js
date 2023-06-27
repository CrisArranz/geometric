class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext("2d");

    this.background = new Background(this.context);
    this.geometryc = new Geometryc(this.context);

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
    this.background.move();
    this.geometryc.move();
  }

  draw() {
    this.background.draw();
    this.geometryc.draw();
  }

  onKeyDown() {
    this.geometryc.onKeyDown();
  }
}