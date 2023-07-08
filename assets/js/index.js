window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("audio").volume = 0.1;
  document.getElementById("start-btn").addEventListener("click", () => {
    const audio = new Audio("/assets/audio/buttons.mp3");
    audio.volume = 0.3;
    audio.play();
    document.querySelector("audio").volume = 0;
    setTimeout(() => {
      document.querySelector(".container-intro").classList.add("none");
      document.querySelector(".container-game").classList.remove("none");
      document.querySelector(".container-game").classList.remove("flex");
      const game = new Game("geometric", onGameOver, onSaveProgress);
      game.start();

      document.addEventListener("keydown", () => {
        game.onKeyDown();
      });
    }, 1000)
  })
})


function onGameOver() {
  document.querySelector("audio").volume = 0.1;
  document.querySelector(".container-intro").classList.remove("none");
  document.querySelector(".container-game").classList.remove("flex");
  document.querySelector(".container-game").classList.add("none");
}

function onSaveProgress(progress) {
  const arrayResults = window.localStorage.getItem("geometric-scores") ? JSON.parse(window.localStorage.getItem("geometric-scores")) : [];
  arrayResults.push({score: progress})
  window.localStorage.setItem("geometric-scores", JSON.stringify(arrayResults))
}
