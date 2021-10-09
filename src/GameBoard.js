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
		/** @private */ this.element = document.getElementById('gameboard')
		this.draw(state)
	}

	/**
	 * Draws the game state.
	 * 
	 * If you have changed the game state, and want to see the change.
	 * You have to draw again.
	 * 
	 * @param {Object} state The game state to be drawn.
	 */
	draw(state) {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild)
		}

		const board = state.toArray()
		for (let y = state.HEIGHT - 1; y >= 0; y--) {
			for (let x = 0; x < state.WIDTH; x++) {
				const field = document.createElement('div')
				field.classList.add(FIELD_MAP[board[x][y]])
				this.element.appendChild(field)
			}
		}
	}
}

export { GameBoard }
