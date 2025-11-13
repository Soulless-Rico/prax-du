// DATA
const maxWordLength = 5
const maxTries = 6

let word = ''
let tries = 1

// picks random word
let solution = allWords[allWords.length * Math.random() | 0].toLowerCase() // | 0 shortcut for math.floor()
let noAccentSolution = noAccents(solution) // removes diacritics from the solution
let noAccentWords = allWords.map(x => noAccents(x)) 

// tracks current progress
let lettersInRow = {
	correct: [],
	present: [],
	wrong: []
}

// keyboard control
document.addEventListener('keydown', (event) => {

	if (event.key === 'Enter') {
		submitWord() // submit word for checking
	}
	else if (event.key === 'Backspace') {
		removeLetter() // remove a letter
	}
	else {
		addLetter(event.key) // add letter to tile
	}
})

// submit process
const submitWord = () => {
	if (word.length !== maxWordLength) return

	// check if the word exists in the dictionary
	if (!noAccentWords.includes(noAccents(word))) {
		animateRowShake(currentRow())
		return
	}

	findLettersInRow()
	highlightLetters(currentRow())
	animateTileReveal(currentRow())

	// wait before deciding player status
	setTimeout(() => {
		judgeResult()
	}, 1500)
}

// letter adding process
const addLetter = (character) => {
	if (word.length >= maxWordLength) return

	/* 
	check for valid characters
	/.../ = defines regex pattern
	^ = start of the string
	\p{...} = unicode property 
	$ = end of string
	u = unicode flag (accented letters)
	*/
	if (/^\p{L}$/u.test(character)) {
		word = word + character
		word = word.toLowerCase()

		let tile = currentTile()
		tile.innerHTML = character

		animateTileBounce(tile)
	}
}

// remove process
const removeLetter = () => {
	if (word.length <= 0) return

	let tile = currentTile()
	tile.innerHTML = ''
	tile.className = 'tile'

	// deletes last letter
	word = word.slice(0, -1)
}

// finds the next tile
const currentTile = () => {
	return currentRow().querySelector(':nth-child(' + word.length + ')') // :nth-child() = selects an element based on its position among its siblings
}

// finds the html find corresponding to the tries number
const currentRow = () => {
	return document.querySelector('.row:nth-child(' + tries + ')')
}

// game results process
const judgeResult = () => {
	// checks if the player guessed the correct keyword
	if (noAccents(word) === noAccentSolution) {
		animateTileDance(currentRow())
	}
	// checks if player ran out of tries
	else if (tries >= maxTries) {
		youVeryMuchLose()
		
		// tell the player the solution with a 2 second delay
		setTimeout(() => {
			alert('riešenie bolo: ' + solution.toUpperCase())
			window.location.reload()
		}, 2000)
	}
	else {
		word = ''
		tries++
	}
}

// letter finding process
const findLettersInRow = () => {
	let present = [];
	let correct = [];
	let wrong = [];

	[...word].forEach((letter, index) => { // [...word] = individualy writes each characher into an array --> loop through the letters
		letter = noAccents(letter)

		// correct letter & place
		if (noAccentSolution.charAt(index) === letter) {
			correct.push(letter)
		}
		// correct letter & wrong place
		else if (noAccentSolution.includes(letter)) {
			present.push(letter)
		}
		// both wrong
		else {
			wrong.push(letter)
		}
	})

	// save letters into an object
	lettersInRow = {
		present,
		correct,
		wrong
	}
}

// accent removing process
function noAccents (str) {
	/*
	str.normalize("NFD") = splits accented characters into the base letter and the accent
	.replace(/\p{Diacritic}/gu, "") = removes leftover accents
	*/
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}