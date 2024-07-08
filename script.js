let randomNumber = (parseInt(Math.random()*100 + 1)) //generates random number bewtween 1 to 100
const submit = document.querySelector("#subt")
const userInput = document.querySelector("#guessField")
const guessSlot = document.querySelector(".guesses")
const remaining = document.querySelector(".lastResult")
const lowOrHigh = document.querySelector(".lowOrHi")
const startOver = document.querySelector(".resultParas")

const p = document.createElement('p')

let prevGuess = [] //an array that stores all the previous values that the user guessed
let numOfGuesses = 1

let playGame = true;

if(playGame){
    submit.addEventListener('click', (e)=>{
    e.preventDefault()
    const guess = (parseInt(userInput.value))
    console.log(guess) //to check if its working
    validateGuess(guess); //called this func so that it can check and validate the input from the user
    })
}


function validateGuess(guess){
// this func checks if the value is not negative, is a number and is btween 1-100
if(isNaN(guess)){
    alert("Please enter a valid Number")
}
else if(guess<1){
    alert("Please enter a Number more than 1")
}
else if(guess>100){
    alert("Please enter a Number less than 100")
}
prevGuess.push(guess) // storing all the guesses by the user in an array
if(numOfGuesses ===11){
    cleanUpGuess(guess) //we call func to display a msg, how that msg will be displayed is on cleanUpGuess() func
    displayMessage(`Game Over. Random number was ${randomNumber}`)
    endGame()
} 
else{
    cleanUpGuess(guess)
    checkGuess(guess) //checks if the user has guessed the number or not
}
}

function checkGuess(guess){
//this func checks if the guess is equal to the random number, or is high or low
if(guess === randomNumber){
    displayMessage(`You guessed it right`)
    endGame()
}
else if(guess<randomNumber){
    displayMessage(`Number is too low`)
}
else if(guess>randomNumber){
    displayMessage(`Number is too high`)
}
}

function cleanUpGuess(guess) {
    userInput.value = ''; //ater each guess we update the value of input guess to empty so that user can guess new value
    guessSlot.innerHTML += `<span>${guess} </span>`; //adding guesses to an array that contains all previous guesses
    numOfGuesses++; // numOfGuesses++; //increase the numer of guesses after every guess
    remaining.innerHTML = `${11 - numOfGuesses}`;// remaining chances to guess
}

function displayMessage(message){
lowOrHigh.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    // Clear input field and disable it
    userInput.value = ''
    userInput.setAttribute('disabled', '') // did this so the user cannot enter more input
    p.classList.add('button') //paragraph me ek button add kar liya // Add CSS class to style the button
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>` //start new game button
    // Set the innerHTML of the paragraph to include an h2 element with id "newGame"
    startOver.appendChild(p)  // Append the paragraph to the startOver element
    playGame = false// // Set playGame to false to indicate the game has ended
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector("#newGame")
    newGameButton.addEventListener('click', ()=>{
        randomNumber = (parseInt(Math.random()*100 + 1))
        prevGuess = []
        numOfGuesses = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numOfGuesses}`;
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })
}
