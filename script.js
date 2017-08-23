var numOfSquares = 6; //this is saved to a variable bc it is changed determined on difficulty. 6 is the deafult
var colors = []; //this runs a function that calls another to generate colors and then push to an array which is then returned
var squares = document.querySelectorAll(".square"); //selects all divs with the id of square
var pickedColor; //runs a function to randomly choose a number from 0 - to the number of colors, using the chosen number as in index to the array
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
// we deleted the different buttons. Refactored to a single class called mode. 
init();

function init() {
	//mode buttons event listeners
    setupModeButtons(); //runs function that sets a loop to run a function that tells it how mant numbers of colors to show 
    setupSquareListeners(); //adds click listeners to to the button the user clicks and runs an if statement to determine if its right or not.
	}
	reset(); //generate colors


    function setupModeButtons(){
    	for (var i = 0; i < modeButtons.length; i++) { //goes thru the buttons nodelist with the class mode as we created on top.
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numOfSquares = 3;
				//This function calls reset(), which in turn calls generateRandomColors, which takes in an arugment to determine the amount of colors to generate and push to the array. This way this is sort of dynamic. We are passing the argument with an if statement that is analyizing that text is in the button. 
			} else {
				numOfSquares = 6;
			}
			reset(); //resets using function below    
		})
	}
    
}

function setupSquareListeners(){
    	for (var i = 0; i < squares.length; i++) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			//get color of picked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if (clickedColor === pickedColor) {
				message.textContent = "Correct";
				changeColors(clickedColor);
				document.querySelector("h1").style.background = clickedColor;
				resetButton.textContent = "Play Again?"
			} else {
				this.style.background = "#232323";
				message.textContent = "Try Again"
			}
		});
}
}

for (var i = 0; i < modeButtons.length; i++) { //goes thru the buttons nodelist with the class mode as we created on top.
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numOfSquares = 3;
			//This function calls reset(), which in turn calls generateRandomColors, which takes in an arugment to determine the amount of colors to generate and push to the array. This way this is sort of dynamic. We are passing the argument with an if statement that is analyizing that text is in the button. 
		} else {
			numOfSquares = 6;
		}
		reset(); //resets using function below    
	})
}

function reset() {
	colors = generateRandomColors(numOfSquares);
	//pick a new randow color from array
	pickedColor = pickColor();
	//change color of squares
	colorDisplay.textContent = pickedColor;
	message.textContent = "";
	resetButton.textContent = "New Colors"
	for (var i = 0; i < squares.length; i++) {
		// add initial colors to squares
		if (colors[i]) {
			squares[i].style.display = "block"; // make sure the are visible
			//if there is a color do this, color will be null if there isnt a color, which will fire else statement
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	document.querySelector("h1").style.backgroundColor = "steelblue"; //reset color   
}
resetButton.addEventListener("click", function() {
	reset();
})


colorDisplay.textContent = pickedColor;
for (var i = 0; i < squares.length; i++) {
	// add click listeners to squares
	squares[i].addEventListener("click", function() {
		//get color of picked square
		var clickedColor = this.style.backgroundColor;
		//compare color to picked color
		if (clickedColor === pickedColor) {
			message.textContent = "Correct";
			changeColors(clickedColor);
			document.querySelector("h1").style.background = clickedColor;
			resetButton.textContent = "Play Again?"
		} else {
			this.style.background = "#232323";
			message.textContent = "Try Again"
		}
	});
}

function changeColors(x) {
	//loop thru all squares change to match correct color
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = x;
	}
}

function pickColor() {
	//pick a random number
	var random = (Math.floor(Math.random() * colors.length));
	return colors[random];
	//  
}

function generateRandomColors(num) {
	//make an array
	var arr = []
		//add num random colors to array
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor() {
	// pick a red, green, and blue
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}