const FIELD_MAP = {
	0: 'empty',
	1: 'red',
	2: 'yellow',
}

/** @class GameBoard for drawing the game in browser. */
class GameBoard {
	/**
	 * Creates a GameBoard object. You should never have more than one.
	 * 
	 * @param {Object} state The game state to be drawn 
	 */
	constructor (state) {
		/** @private */ this.state = state
		/** @private */ this.element = document.getElementById('gameboard')
		this.draw()
	}

	/**
	 * Sets a new game state. Usually used when starting a new game.
	 * 
	 * @param {Object} state The new game state.
	 */
	setState(state) {
		this.state = state
		this.draw()
	}

	/**
	 * Draws the game state.
	 * 
	 * If you have changed the game state, and want to see the change.
	 * You have to draw again.
	 */
	draw() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild)
		}
		for (let y = this.state.HEIGHT - 1; y >= 0; y--) {
			for (let x = 0; x < this.state.WIDTH; x++) {
				const field = document.createElement('div')
				field.classList.add(FIELD_MAP[this.state.board[x][y]])
				this.element.appendChild(field)
			}
		}
	}
}

export { GameBoard }
