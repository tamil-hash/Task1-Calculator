const display = document.querySelector(".display-input");
const closeBtn = document.querySelector(".close-btn");
const equalBtn = document.querySelector(".equal-btn");
const deleteBtn = document.querySelector(".del-btn");
const btns = document.querySelectorAll(".calc-btn");
const alert = document.querySelector(".alert");
const alertMsg = document.querySelector(".alert-msg");
const history = document.querySelector(".history");
const calSections = document.querySelectorAll(".cal");
const historyBtn = document.querySelector(".history-btn");

console.log(calSections);

const previousCalculations = JSON.parse(localStorage.getItem("previousCalculations")) || {
	mixed: [],
	addition: [],
	subtraction: [],
	multiplication: [],
	division: [],
	modulus: [],
};

//retreiving history from local Storage

window.addEventListener("DOMContentLoaded", () => {
	if (previousCalculations.mixed.length !== 0) {
		previousCalculations.mixed.forEach((calculation) => {
			setItem(0, calculation);
		});
	}
	if (previousCalculations.addition.length !== 0) {
		previousCalculations.addition.forEach((calculation) => {
			setItem(1, calculation);
		});
	}
	if (previousCalculations.subtraction.length !== 0) {
		previousCalculations.subtraction.forEach((calculation) => {
			setItem(2, calculation);
		});
	}
	if (previousCalculations.multiplication.length !== 0) {
		previousCalculations.multiplication.forEach((calculation) => {
			setItem(3, calculation);
		});
	}
	if (previousCalculations.division.length !== 0) {
		previousCalculations.division.forEach((calculation) => {
			setItem(4, calculation);
		});
	}
	if (previousCalculations.modulus.length !== 0) {
		previousCalculations.modulus.forEach((calculation) => {
			setItem(5, calculation);
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
		showAlerts("Please Enter Some Value.");
	} else {
		try {
			const answer = eval?.(display.value);
			const calculation = display.value + "=" + answer;
			setHistory(calculation);
			display.value = answer;
		} catch (err) {
			showAlerts("Incorrect Syntax.");
		}
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
	let index;
	if (
		(calculation.indexOf("+") !== -1 && calculation.indexOf("-") !== -1) ||
		(calculation.indexOf("+") !== -1 && calculation.indexOf("*") !== -1) ||
		(calculation.indexOf("+") !== -1 && calculation.indexOf("/") !== -1) ||
		(calculation.indexOf("+") !== -1 && calculation.indexOf("%") !== -1) ||
		(calculation.indexOf("-") !== -1 && calculation.indexOf("+") !== -1) ||
		(calculation.indexOf("-") !== -1 && calculation.indexOf("*") !== -1) ||
		(calculation.indexOf("-") !== -1 && calculation.indexOf("/") !== -1) ||
		(calculation.indexOf("-") !== -1 && calculation.indexOf("%") !== -1) ||
		(calculation.indexOf("*") !== -1 && calculation.indexOf("+") !== -1) ||
		(calculation.indexOf("*") !== -1 && calculation.indexOf("-") !== -1) ||
		(calculation.indexOf("*") !== -1 && calculation.indexOf("/") !== -1) ||
		(calculation.indexOf("*") !== -1 && calculation.indexOf("%") !== -1) ||
		(calculation.indexOf("/") !== -1 && calculation.indexOf("+") !== -1) ||
		(calculation.indexOf("/") !== -1 && calculation.indexOf("-") !== -1) ||
		(calculation.indexOf("/") !== -1 && calculation.indexOf("*") !== -1) ||
		(calculation.indexOf("/") !== -1 && calculation.indexOf("%") !== -1) ||
		(calculation.indexOf("%") !== -1 && calculation.indexOf("+") !== -1) ||
		(calculation.indexOf("%") !== -1 && calculation.indexOf("-") !== -1) ||
		(calculation.indexOf("%") !== -1 && calculation.indexOf("*") !== -1) ||
		(calculation.indexOf("%") !== -1 && calculation.indexOf("/") !== -1)
	) {
		index = 0;
		setLS("mixed", calculation);
	} else if (calculation.indexOf("+") === 1) {
		index = 1;
		setLS("addition", calculation);
	} else if (calculation.indexOf("-") === 1) {
		index = 2;
		setLS("subtraction", calculation);
	} else if (calculation.indexOf("*") === 1) {
		index = 3;
		setLS("multiplication", calculation);
	} else if (calculation.indexOf("/") === 1) {
		index = 4;
		setLS("division", calculation);
	} else if (calculation.indexOf("%") === 1) {
		index = 5;
		setLS("modulus", calculation);
	}
	const element = document.createElement("h2");
	element.textContent = calculation;
	element.classList.add("calculation");
	calSections[index].appendChild(element);
}

// show alerts

function showAlerts(message) {
	alertMsg.innerText = message;
	alert.classList.add("show");
	setTimeout(() => {
		alert.classList.remove("show");
		alertMsg.innerText = "";
	}, 3000);
}

// localStorage

function setLS(action, calculation) {
	previousCalculations[action].push(calculation);
	console.log(previousCalculations);

	localStorage.setItem("previousCalculations", JSON.stringify(previousCalculations));
}

function setItem(index, calculation) {
	const element = document.createElement("h2");
	element.textContent = calculation;
	element.classList.add("calculation");
	calSections[index].appendChild(element);
}
