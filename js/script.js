const inputResult = document.getElementById("input-result");

const themeBtn = document.querySelector(".theme-btn");
const themeIndicator = document.querySelector(".theme-indicator");

let lastCalculationAction = false;

//Displaying Button value to inputResult:
function appendToInput(value){
	if(lastCalculationAction){
		inputResult.value = "";
		lastCalculationAction = false;
	}

	if (inputResult.value === "" || inputResult.value === "0"){
		inputResult.value = value;
	}
	
	else{
		inputResult.value += value;
	}
	
}

//Clears all the displayed input inside the inputResult:
function allClear(){
	inputResult.value = "";
}


//Deletes the last inputted character inside the inputResult:
function deleteLastCharacter(){
	inputResult.value = inputResult.value.slice(0, -1) || "";
}


//Calculates the inputs inside the inputResult:
function calculateResult(){
	try{
		let percentExpression = inputResult.value.replace(/(\d+)%/g, (percentageNum, capturedDigit) => {
			return capturedDigit / 100;
		})

		.replace(/÷/g, "/")
		.replace(/×/g, '*');
		
		inputResult.value = eval(percentExpression) || "";
	}
	catch(error){
		inputResult.value = "Syntax Error!";
	}
	lastCalculationAction = true;
}



//Dark Mode function
themeBtn.addEventListener("click", () => {
	themeBtn.classList.toggle("clicked");
	document.body.classList.toggle("darkmode");

	if(document.body.classList.contains("darkmode")){
		themeIndicator.textContent = "Dark Mode";
		localStorage.setItem("isDarkModeOn" , "Yes");
	}

	else{
		themeIndicator.textContent = "Light Mode";
		localStorage.setItem("isDarkModeOn" , "No");
	}
});

function loadCurrentTheme(){
	const isDarkModeOn = localStorage.getItem("isDarkModeOn") || "[]";

	if (isDarkModeOn === "Yes") {
        document.body.classList.add("darkmode");
        themeBtn.classList.add("clicked");
        themeIndicator.textContent = "Dark Mode";
    } else {
        document.body.classList.remove("darkmode");
        themeBtn.classList.remove("clicked");
        themeIndicator.textContent = "Light Mode";
    }
}

loadCurrentTheme();
