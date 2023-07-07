window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-btn").addEventListener("click", () => {
    document.querySelector(".container-intro").classList.add("none");
    document.querySelector(".container-game").classList.remove("none");
    document.querySelector(".container-game").classList.remove("flex");
    const game = new Game("geometric");
    game.start();

    document.addEventListener("keydown", () => {
      game.onKeyDown();
    });
  })
})

