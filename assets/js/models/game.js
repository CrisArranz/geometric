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
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.timeLaps++;
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
        this.clearObstacles();
        this.level();
        if ((Math.floor(this.audio.duration) + 5) * this.framePerSecond < this.timeLaps) {
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

  move() {
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

  addObstacles(type) {
    switch(type) {
      case "B1":
        this.obstacles.push(new Block(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR, WIDTH_BLOCK_OBSTACLE, HEIGHT_BLOCK_OBSTACLE, "/assets/images/B1.png"));
        break;
      case "B2":
        this.obstacles.push(new Block(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR - HEIGHT_GEOMETRIC, WIDTH_BLOCK_OBSTACLE, HEIGHT_BLOCK_OBSTACLE * 2, "/assets/images/B2.png"));
        break;
      case "B3":
        this.obstacles.push(new Block(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR - (HEIGHT_GEOMETRIC * 2), WIDTH_BLOCK_OBSTACLE, HEIGHT_BLOCK_OBSTACLE * 3, "/assets/images/B3.png"));
        break;
      case "B4":
        this.obstacles.push(new Block(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR - HEIGHT_GEOMETRIC, WIDTH_BLOCK_OBSTACLE, HEIGHT_BLOCK_OBSTACLE, "/assets/images/B1.png"));
        break;
      case "Base":
        this.obstacles.push(new Block(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR - HEIGHT_GEOMETRIC, WIDTH_BLOCK_OBSTACLE, HEIGHT_BLOCK_OBSTACLE / 2, "/assets/images/B1.png"));
        break;
      case "T1":
        this.obstacles.push(new Triangle(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_TRIANGLE_OBSTACLE, WIDTH_TRIANGLE_OBSTACLE, HEIGHT_TRIANGLE_OBSTACLE, "/assets/images/T1.png"));
        break;
      case "Spike":
        this.obstacles.push(new Spike(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_SPIKE_OBSTACLE, WIDTH_SPIKE_OBSTACLE, HEIGHT_SPIKE_OBSTACLE, "/assets/images/spike.png"));
        break;
    }
  }

  level() {
    if (this.timeLaps === 20){
      this.addObstacles("B1");
    }
    if (this.timeLaps === 40){
      this.addObstacles("B3");
    }
    if (this.timeLaps === 60) {
      this.addObstacles("B2");
    }
    if (this.timeLaps === 80) {
      this.addObstacles("B1");
    }
    if (this.timeLaps === 415){
      this.addObstacles("B1");
    }
    if (this.timeLaps === 450){
      this.addObstacles("Base");
      this.addObstacles("B1");
    }
    if (this.timeLaps === 460){
      this.addObstacles("Base");
    }
    if (this.timeLaps === 470) {
      this.addObstacles("Spike"); 
    }
    if (this.timeLaps === 500) {
      this.addObstacles("Base"); 
    }
    if (this.timeLaps === 510) {
      this.addObstacles("T1"); 
    }
    if (this.timeLaps === 515) {
      this.addObstacles("T1"); 
    }
    if (this.timeLaps === 520) {
      this.addObstacles("T1"); 
    }
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.isVisible());
  }

  checkCollisions() {
    if (this.obstacles.some(obstacle => this.player.checkCollision(obstacle))) {
      this.gameOver(); 
    }
  }

  gameOver() {
    this.audio.pause();
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}