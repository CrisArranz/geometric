class Game {
  constructor(canvasId) {
    this.context = document.getElementById(canvasId).getContext("2d");

    this.player = new Geometryc(this.context);
    this.obstacles = [];
    this.firstBackground = new Background(this.context);
    this.secondBackground = new Background(this.context, this.context.canvas.width);
    this.firstFloor = new Floor(this.context, 0, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_GEOMETRIC);
    this.secondFloor = new Floor(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_GEOMETRIC);

    this.framePerSecond = 60;
    this.intervalId = null;
    this.audio = new Audio("/assets/audio/track1.ogg");
    this.audio.volume = 0.2;

    this.timeLaps = 0;
  }

  start() {
    this.audio.play();
    //this.addObstacles();
    console.log((Math.floor(this.audio.duration) + 1) * 1000)
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.timeLaps++;
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
        this.clearObstacles();
        if ((Math.floor(this.audio.duration) + 5) * this.framePerSecond < this.timeLaps) {
          console.log(this.timeLaps)
          this.gameOver();
        }
      }, 1000 / this.framePerSecond);
    }
  }

  stop() {
    this.audio.pause();
    clearInterval(this.intervalId);
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
    this.player.move();
    this.obstacles.forEach(obstacle => obstacle.move());
  }

  draw() {
    this.firstBackground.draw();
    this.secondBackground.draw();
    this.firstFloor.draw();
    this.secondFloor.draw();
    this.player.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
  }

  onKeyDown() {
    this.player.onKeyDown();
  }

  addObstacles() {
    this.obstacles.push(new Rectangle(this.context, this.context.canvas.width));
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.isVisible());
  }

  checkCollisions() {
    if (this.obstacles.some(obstacle => obstacle.checkCollision(this.player))) {
      this.gameOver(); 
    }
  }

  gameOver() {
    this.audio.pause();
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}