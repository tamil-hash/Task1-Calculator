const display = document.querySelector(".display-input");
const closeBtn = document.querySelector(".close-btn");
const equalBtn = document.querySelector(".equal-btn");
const deleteBtn = document.querySelector(".del-btn");
const btns = document.querySelectorAll(".calc-btn");
const alert = document.querySelector(".alert");
const history = document.querySelector(".history");
const historyBtn = document.querySelector(".history-btn");

const previousCalculations =
  JSON.parse(localStorage.getItem("previousCalculations")) || [];

//retreiving history from local Storage

window.addEventListener("DOMContentLoaded", () => {
  if (previousCalculations.length !== 0) {
    previousCalculations.forEach((calculation) => {
      setHistory(calculation);
    });
  }
});

//calculator

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    display.value += btn.value;
  });
});

//clear input

deleteBtn.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});

//do calculation

equalBtn.addEventListener("click", () => {
  if (display.value === "") {
    alert.classList.add("show");
    setTimeout(() => {
      alert.classList.remove("show");
    }, 3000);
  } else {
    const answer = eval(display.value);
    const calculation = display.value + "=" + answer;
    display.value = answer;
    previousCalculations.push(calculation);
    setHistory(calculation);
    localStorage.setItem(
      "previousCalculations",
      JSON.stringify(previousCalculations)
    );
  }
});

//history Section

//open history

historyBtn.addEventListener("click", () => {
  history.classList.toggle("show");
});

//close History

closeBtn.addEventListener("click", () => {
  history.classList.remove("show");
});

//set history

function setHistory(calculation) {
  const element = document.createElement("h2");
  element.textContent = calculation;
  element.classList.add("calculation");
  history.appendChild(element);
}
