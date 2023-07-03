document.getElementById("btn-start").addEventListener("click",() => {
  const game = new Game("geometric");
  game.start();

  window.addEventListener("keydown", () => {
    game.onKeyDown();
  });
});
