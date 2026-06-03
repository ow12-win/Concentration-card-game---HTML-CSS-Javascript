

// This file contains the JavaScript code for the matching pairs game. It defines the game logic, event listeners, and functions to create and shuffle the board, as well as to handle user interactions and display the modal when the game is won or lost.
//i have kept my console logs for deppbuging if there are any future issues so its easily mantainable
let cards =["club_1.png","diamond_1.png","heart_1.png","spade_1.png","club_2.png","diamond_2.png","heart_2.png","spade_2.png","club_3.png","diamond_3.png","heart_3.png","spade_3.png", "club_4.png","diamond_4.png","heart_4.png","spade_4.png","club_5.png","diamond_5.png","heart_5.png","spade_5.png","club_6.png","diamond_6.png","heart_6.png","spade_6.png"];
let board = [];
let Cardsbuttons = [];

let currentPressed = 0;

let numberOfClicks = 0;

let isLocked = false;

let hasShuffled = false;
// The above code initializes the necessary variables for the game, including the card images, the game board, and counters for clicks and matches.


document.addEventListener("click", function(e){
    
    if (e.target.tagName === "BUTTON" && e.target.parentElement.className === "container") {
        console.log("Card clicked:", e.target.querySelector("img").src);
        
        
        const button = e.target.closest(".container button");

        const images = document.querySelectorAll(".container img");
        const buttons = document.querySelectorAll(".container button");
        
        const index = Array.from(buttons).indexOf(button);
        
        const img = images[index];
        const card = board[index];

        if (card.frontOrBack) {
            img.src = card.back;
            card.frontOrBack = false;
        } else {
            img.src = card.front;
            card.frontOrBack = true;
        }

        console.log("Flipped:", card.front);
    
    }
    // The above code handles the click event on the card buttons. It checks if a card button was clicked, retrieves the corresponding card and image, and toggles the card's front or back state accordingly. It also logs the flipped card's image source for debugging purposes.
    else if (e.target.tagName === "iMG" && e.target.parentElement.className === "controller") {

        const otherCardIndex = board.findIndex(c => c.frontOrBack && !c.matched);
        //const otherCard = otherCardIndex !== -1 ? board[otherCardIndex] : null;
        const otherImg = otherCardIndex !== -1 ? document.querySelectorAll(".container img")[otherCardIndex] : null;


        console.log("Image in controller clicked");
        numberOfClicks++;

        if (numberOfClicks % 2 === 0) {
            currentPressed = 0;
        } else{
            currentPressed = card.value;
            currentImg.style.border= "2px solid yellow";
        }

        //console.log(numberOfClicks, "clicks made");
    }
    // The above code handles the click event on the images in the controller. It checks if an image in the controller was clicked, retrieves the corresponding card and image, and updates the game state based on whether a match was found or not. It also logs the number of clicks made for debugging purposes.




    else if (e.target.tagName === "BUTTON" && e.target.parentElement.className === "controller" && e.target.textContent === "Start") {
        //console.log("Start button clicked");
        if (!hasShuffled) {
            alert("Please shuffle the board before starting the game!");
            return;
        }

        document.querySelectorAll(".container button").forEach(element => element.style.backgroundColor = "");

        numberOfClicks = 0;
        currentPressed = 0;

        document.getElementById("counters").style.display = "block";
        
        const images = document.querySelectorAll(".container img");

        for (let i=0; i<images.length; i++) {
            images[i].src = "back.jpg";
            board[i].frontOrBack = false;
            board[i].matched = false;
        }

        document.querySelectorAll(".controller button").forEach(element => element.disabled = true);
        document.querySelectorAll("input[name='boardSize']").forEach(element => element.disabled = true);
    }


    else if (e.target.tagName === "BUTTON" && e.target.parentElement.className === "controller" && e.target.textContent === "Shuffle") {
        shuffleBoard();
    }
    // The above code handles the click event on the Start button in the controller. It checks if the Start button was clicked, verifies that the board has been shuffled, and then initializes the game state for a new game. It resets the click count, hides the card images, and disables the Start button and board size options to prevent changes during an active game.
})

document.addEventListener("change", function(e){
  if (e.target.name === "boardSize") {
    //console.log("Radio clicked:", e.target.value);
    const controller = document.querySelector(".controller");

    controller.innerHTML = "";

    let shuffle = document.createElement("button");
    shuffle.textContent = "Shuffle";
    controller.appendChild(shuffle);
    
    let Start = document.createElement("button");
    Start.textContent = "Start";
    controller.appendChild(Start);

    document.getElementById("test").textContent = "Selected board size: " + e.target.value;
    if (e.target.value === "2x4") {
        createBoard(2, 4);
    } else if (e.target.value === "4x4") {
        createBoard(4, 4);
    } else if (e.target.value === "6x4") {
        createBoard(6, 4);
    }
  }
})
// The above code handles the change event on the board size radio buttons. It checks if a board size option was selected, updates the controller with the Shuffle and Start buttons, and creates the game board based on the selected size.

/*addEventListener("click", function(e){
    if (e.target.textContent === "Shuffle") {
        shuffleBoard();
    }
})*/

function Card(image, back, frontOrBack, value) {
    this.frontOrBack = frontOrBack;
    this.image = image;
    this.back = back;
    this.front = image;
    this.value = value;
}

function getValueFromPath(path) {
    const filename = path.split("/").pop();
    const value = filename.split("_")[1].split(".")[0];
    return parseInt(value);
}
// The above code defines a Card constructor function to create card objects with properties for the front and back images, the current state (front or back), and the card's value. It also includes a helper function to extract the card value from the image file path.

function createBoard(rows, cols) {

    hasShuffled = false;

    for (let i=0; i<board.length; i++){
        board.pop();
    }

    const container = document.querySelector(".container");
    container.innerHTML = "";

    let totalCards = rows * cols;
    for (let i=0; i<totalCards; i++){
        
        board[i] = new Card(cards[i], "back.jpg", true, getValueFromPath(cards[i]));

        let container = document.querySelector(".container");

        let button = document.createElement("button");

        let img = document.createElement("img");
        img.src = board[i].image;
        img.alt = "Playing card";

        button.appendChild(img);
        container.appendChild(button);
      
    }
}
// The above code defines the createBoard function, which initializes the game board based on the specified number of rows and columns. It creates card objects for each card in the selected board size, sets their initial state to face down, and generates the corresponding HTML elements to display the cards on the page.

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("modal").style.display = "flex";
}

function shuffleBoard() {
    hasShuffled = true;

    let pairs =[];
    for (let i=0; i<board.length; i+=2) {
        pairs.push([board[i], board[i+1]]);
    }

    for (let i=(pairs.length*2)-1; i>0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = pairs[Math.floor(i/2)][i%2];
        pairs[Math.floor(i/2)][i%2] = pairs[Math.floor(j/2)][j%2];
        pairs[Math.floor(j/2)][j%2] = temp;
    }

    board = pairs.flat();
    updateBoard();
}
// The above code defines the shuffleBoard function, which shuffles the cards on the game board. It creates pairs of cards, randomly shuffles them using the Fisher-Yates algorithm, and then updates the game board to reflect the new order of the cards.

function updateBoard() {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    for (let i=0; i<board.length; i++){

        let button = document.createElement("button");
        let img = document.createElement("img");
        img.src = board[i].image;
        img.alt = "Playing card";

        button.appendChild(img);
        container.appendChild(button);
        
        button.addEventListener("click", function(){

            if (board[i].matched || board[i].frontOrBack) return;

            const currentCard = board[i];
            const currentImg = img;

            currentCard.frontOrBack = true;
            currentImg.src = currentCard.front;
            
            currentImg.parentElement.style.outline = "2px solid yellow";

            const otherCardIndex = board.findIndex(c => c !== currentCard && c.frontOrBack && !c.matched);
            const otherCard = otherCardIndex !== -1 ? board[otherCardIndex] : null;
            const otherImg = otherCardIndex !== -1 ? document.querySelectorAll(".container img")[otherCardIndex] : null;

            numberOfClicks++;

            document.getElementById("clickCount").textContent = numberOfClicks;
            // The above code handles the click event on each card button. It checks if the clicked card is already matched or face up, and if not, it flips the card and checks for a match with another face-up card. It updates the game state accordingly and logs the number of clicks made for debugging purposes.

            if (numberOfClicks % 2 === 0) {
                if (currentPressed === currentCard.value) {
                    //console.log("Match found:", currentCard.value);
                    currentCard.matched = true;
                    if (otherCard) otherCard.matched = true;
                    currentPressed = 0;
                    document.getElementById("pairCount").textContent = parseInt(document.getElementById("pairCount").textContent) + 1;
                    //console.log("total pairs found:", document.getElementById("pairCount").textContent ,"board length/2:", board.length/2);
                    
                    if (otherCard) otherImg.parentElement.style.outline = "2px solid yellow";

                    if (document.getElementById("pairCount").textContent == board.length / 2) {
                        showModal("Congratulations!");
                        return;
                    }
                    // The above code checks if a match is found when two cards are flipped. If a match is found, it marks both cards as matched, updates the pair count, and checks if all pairs have been found to display the winning modal. It also highlights the matched cards with an outline.
                } else {
                    //console.log("No match. Previous:", currentPressed, "Current:", currentCard.value);
                    setTimeout(() => {
                        currentCard.frontOrBack = false;
                        currentImg.src = currentCard.back;
                        currentImg.parentElement.style.outline = "";
                        
                        if (otherCard) {
                            otherCard.frontOrBack = false;
                            otherImg.src = otherCard.back;
                            otherImg.parentElement.style.outline = "";
                        }

                        if (numberOfClicks > (board.length * 2)-2 ) {
                            showModal("Game Over! try again!");
                            return;
                        }
                        // The above code handles the case when two flipped cards do not match. It uses a timeout to flip the cards back over after a short delay, and checks if the maximum number of clicks has been reached to display the game over modal.
                    }, 500);
                    currentPressed = 0;
                    isLocked = false;
                    
                }
                    
            } else {
                currentPressed = currentCard.value;
            }

           //console.log(numberOfClicks, "clicks made");

        });
    }
}

