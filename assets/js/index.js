const game = new Game("geometric");

document.getElementById("btn-start").addEventListener("click",() => {
  game.start();
});

document.getElementById("btn-stop").addEventListener("click",() => {
  game.stop();
});

window.addEventListener("keydown", () => {
  game.onKeyDown();
});