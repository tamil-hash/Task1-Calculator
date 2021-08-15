const historyBtn = document.querySelector(".history-btn");
const history = document.querySelector(".history");
const closeBtn = document.querySelector(".close-btn");

historyBtn.addEventListener("click", () => {
  history.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  history.classList.remove("show");
});
