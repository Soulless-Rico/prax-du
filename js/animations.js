// makes a tile bounce when a new letter is added
const animateTileBounce = (tile) => {
	tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn')
}

// tiles flip one by one to reveal correctness after submitting a word
const animateTileReveal = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.classList.remove('animate__bounceIn', 'animate__flipInY')

		setTimeout(() => {
			tile.style.visibility = 'visible'
			tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
		}, 0)
	})
}

// tiles bounce in celebration when you guess the correct word
const animateTileDance = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.innerHTML = solution.charAt(index)

		tile.classList.remove('animate__bounceIn', 'animate__flipInY', 'animate__bounce')

		setTimeout(() => {
			tile.classList.add('animate__bounce', `animate__delay-${index}s`)
		}, 0)
	})
}

// hhakes the row left–right when the word is invalid
const animateRowShake = (row) => {
	row.classList.remove('animate__shakeX')

	setTimeout(() => {
		row.classList.add('animate__animated', 'animate__shakeX')
	}, 0)
}

// plays a losing animation when the game ends
const youVeryMuchLose = () => {
	let board = document.querySelector('.board')
	board.classList.add('animate__animated', 'animate__hinge')
}

// colors the tiles and keyboard keys based on how accurate the guess is
const highlightLetters = (row) => {
	let lettersToCheck = noAccentSolution.split('')

	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.style.visibility = 'hidden'

		let letter = noAccents(word.charAt(index))
		let colorClass = 'wrong'

		// the correct letter is in correct the place
		if (lettersToCheck[index] === letter) {
			colorClass = 'correct'
			lettersToCheck[index] = null
		}
		// this letter is present in the solution, but at a different place
		else if (lettersToCheck.indexOf(letter) >= 0) {
			colorClass = 'present'
			lettersToCheck[index] = null
		}

		tile.classList.add(colorClass)
	})

	// keyboard row in footer
	document.querySelectorAll('.keyboard .tile').forEach(tile => {
		let colorClass = ''

		if (lettersInRow.wrong.includes(tile.id)) colorClass = 'wrong'
		if (lettersInRow.present.includes(tile.id)) colorClass = 'present'
		if (lettersInRow.correct.includes(tile.id)) colorClass = 'correct'

		if (colorClass) tile.classList.add(colorClass)
	})
}