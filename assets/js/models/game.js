class Game {
  constructor(canvasId, onGameOver, onSaveProgress) {
    this.context = document.getElementById(canvasId).getContext("2d");

    this.player = new Geometryc(this.context);
    this.obstacles = [];
    this.firstBackground = new Background(this.context);
    this.secondBackground = new Background(this.context, this.context.canvas.width);
    this.firstFloor = new Floor(this.context, 0, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_GEOMETRIC);
    this.secondFloor = new Floor(this.context, this.context.canvas.width, this.context.canvas.height - HEIGHT_FLOOR + HEIGHT_GEOMETRIC);

    this.framePerSecond = 60;
    this.intervalId = null;
    this.audios = {
      levels: {
        one: {
          audio: new Audio("/assets/audio/track1.ogg"),
          volumen: 0.2
        }
      },
      dead: {
        audio: new Audio("/assets/audio/explode.mp3"),
        volumen: 0.2
      }
    }

    this.timeLaps = 0;
    this.progress = 0;
    this.onGameOver = onGameOver;
    this.onSaveProgress = onSaveProgress;
  }

  start() {
    this.audios.levels.one.audio.play();
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.timeLaps++;
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
        this.clearObstacles();
        this.level();
        if (DURATION_SONG * this.framePerSecond < this.timeLaps) {
          this.gameOver();
        }
        if (this.progress / 60 < DURATION_SONG) {
          this.progress++;
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
    this.drawProgress();
    this.player.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
  }

  drawProgress() {
    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = 6;
    this.context.font = "35px geometryc-dash";
    this.context.rect(5, 5, this.context.canvas.width - 10, 40);
    this.context.fillStyle = "green";
    this.context.fillRect(9, 9, ((this.context.canvas.width - 15) * Math.floor(Math.floor(this.progress / 60) * 100 / DURATION_SONG)) / 100, 30);
    this.context.fillStyle = "white";
    this.context.fillText(`${Math.floor(Math.floor(this.progress / 60) * 100 / DURATION_SONG)}%`, this.context.canvas.width / 2 - 35, 35, 150);
    this.context.stroke();
    this.context.closePath();
    this.context.restore();        
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
    if (this.timeLaps === 155){
      this.addObstacles("B1");
    }
    if (this.timeLaps === 190){
      this.addObstacles("Base");
      this.addObstacles("B1");
    }
    if (this.timeLaps === 200){
      this.addObstacles("Base");
    }
    if (this.timeLaps === 210) {
      this.addObstacles("Spike"); 
    }
    if (this.timeLaps === 240) {
      this.addObstacles("Base"); 
    }
    if (this.timeLaps === 250) {
      this.addObstacles("T1"); 
    }
    if (this.timeLaps === 255) {
      this.addObstacles("T1"); 
    }
    if (this.timeLaps === 260) {
      this.addObstacles("T1"); 
    }
    if (this.timeLaps === 310){
      this.addObstacles("Spike");
    }
    if (this.timeLaps === 315){
      this.addObstacles("Base");
    }
    if (this.timeLaps === 325){
      this.addObstacles("Base");
    }
    if (this.timeLaps === 355){
      this.addObstacles("Spike");
    }
    if (this.timeLaps === 375){
      this.addObstacles("B3");
    }
    if (this.timeLaps === 395) {
      this.addObstacles("B1");
    }
    if (this.timeLaps === 415) {
      this.addObstacles("Spike");
    }
    if (this.timeLaps === 435) {
      this.addObstacles("Base");
    }
    if (this.timeLaps === 495) {
      this.addObstacles("T1");
    }
    if (this.timeLaps === 535) {
      this.addObstacles("T1");
    }
    if (this.timeLaps === 540) {
      this.addObstacles("T1");
    }
    if (this.timeLaps === 575) {
      this.addObstacles("T1");
    }
    if (this.timeLaps === 580) {
      this.addObstacles("T1");
    }
    if (this.timeLaps === 585) {
      this.addObstacles("T1");
    }
    if (this.timeLaps === 650) {
      this.addObstacles("B2");
    }
    if (this.timeLaps === 670) {
      this.addObstacles("B1");
    }
    if (this.timeLaps === 690) {
      this.addObstacles("B3");
    }
    if (this.timeLaps === 710) {
      this.addObstacles("Base");
    }
    if (this.timeLaps === 730) {
      this.addObstacles("B1");
    }
    if (this.timeLaps === 750) {
      this.addObstacles("Spike");
    }
    if (this.timeLaps === 775) {
      this.addObstacles("Base");
    }
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.isVisible());
  }

  checkCollisions() {
    if (this.obstacles.some(obstacle => this.player.checkCollision(obstacle))) {
      this.audios.dead.audio.play();
      this.gameOver();
    }
  }

  gameOver() {
    this.audios.levels.one.audio.pause();
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.onSaveProgress(Math.floor(Math.floor(this.progress / 60) * 100 / DURATION_SONG));
    setTimeout(() => {
      this.onGameOver();
    }, 2000);
  }
}