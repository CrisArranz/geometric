const game = new Game("geometric");
game.start();

document.addEventListener("keydown", () => {
  game.onKeyDown();
});

