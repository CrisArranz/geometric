const game = new Game("geometric");

window.addEventListener("keydown", () => {
  game.onKeyDown();
});

document.getElementById("btn-start").addEventListener("click",() => {
  game.start();
})

document.getElementById("btn-stop").addEventListener("click",() => {
  game.stop();
})