/** @class GameState for managing game states. */
class GameState {
	/**
	 * Creates a new game state.
	 * 
	 * @param {(number[][]|GameState)} [state] Possible starting state as an array or another state to copy from.
	 */
	constructor (state) {
		/** @public */ this.WIDTH = 7
		/** @public */ this.HEIGHT = 6
		/**
		 * @public
		 * @type {number[][]}
		 */
		this.board
		/**
		 * @private
		 * @type {number[]}
		 */
		this.height
		/**
		 * @private
		 * @type number
		 */
		this.moves

		if (state === undefined) {
			this.board = Array(this.WIDTH).fill().map(() => Array(this.HEIGHT).fill(0))
			this.height = Array(this.WIDTH).fill(0)
			this.moves = 0
		} else if (Object.prototype.toString.call(state) === '[object Array]'){
			this.board = JSON.parse(JSON.stringify(state))
			this.height = []
			for (let x = 0; x < this.WIDTH; x++) {
				let height = 0
				for (let y = 0; y < this.HEIGHT; y++){
					if (state[x][y] == 0) break
					height++
				}
				this.height.push(height)
			}
			this.moves = this.height.reduce((s, v) => s + v)
		} else  if (Object.prototype.toString.call(state) === '[object String]') {
			this.board = Array(this.WIDTH).fill().map(() => Array(this.HEIGHT).fill(0))
			this.height = Array(this.WIDTH).fill(0)
			this.moves = 0
			for (let i = 0; i < state.length; i++) {
				this.play(parseInt(state[i]) - 1)
			}
		} else {
			const b = JSON.stringify(state.board)
			this.board = JSON.parse(b)
			this.height = [...state.height]
			this.moves = state.moves
		}
	}

	/**
	 * Checks if it is possible to play into a certain column.
	 * 
	 * @param {number} col The column that is checked.
	 * @returns {boolean} If column can be played.
	 */
	canPlay(col) {
		return this.height[col] < this.HEIGHT
	}

	/**
	 * Checks if the game board is full.
	 * 
	 * @returns If game board is full
	 */
	isFull() {
		return this.moves === (this.WIDTH * this.HEIGHT)
	}

	/**
	 * Plays into a certain column.
	 * 
	 * @param {number} col The column to be played into.
	 */
	play(col) {
		this.board[col][this.height[col]] = 1 + this.moves % 2
		this.height[col]++
		this.moves++
	}

	/**
	 * Checks if the game is won when, the column is played.
	 * 
	 * @param {number} col The column to be checked.
	 * @returns If it is a winning move.
	 */
	isWinningMove(col) {
		const newState = new GameState(this)
		newState.play(col)
		const grid = newState.board
		const player = 1 + this.moves % 2
		let combo = 1
		const placeX = col
		const placeY = this.height[col]

		// |
		for (let i = 1; i <= 3; i++) {
			if (grid[placeX][placeY - i] === player) {
				if (combo === 3) return true
				combo++
			}
		}
		combo = 0

		// -
		for (let x = 0; x < this.WIDTH; x++) {
			if (grid[x][placeY] === player) {
				if (combo === 3) return true
				combo++
			} else {
				combo = 0
			}
		}
		combo = 0

		// How much space is around
		const minusX = placeX
		const plusX = this.WIDTH - (placeX + 1)
		const minusY = placeY
		const plusY = this.HEIGHT - (placeY + 1)

		// \
		const upLeftSpace = Math.min(minusX, plusY)
		const downRightSpace = Math.min(plusX, minusY)
		for (
			let x = placeX - upLeftSpace, y = placeY + upLeftSpace, i = 0;
			i <= upLeftSpace + downRightSpace;
			i++, x++, y--
		) {
			if (grid[x][y] === player) {
				if (combo === 3) return true
				combo++
			} else {
				combo = 0
			}
		}
		combo = 0

		// /
		const downLeftSpace = Math.min(minusX, minusY)
		const upRightSpace = Math.min(plusX, plusY)
		for (
			let x = placeX - downLeftSpace, y = placeY - downLeftSpace, i = 0;
			i <= downLeftSpace + upRightSpace;
			i++, x++, y++
		) {
			if (grid[x][y] === player) {
				if (combo === 3) return true
				combo++
			} else {
				combo = 0
			}
		}

		return false
	}

	/**
	 * Tells how many moves have been played.
	 * 
	 * @returns Number of played moves.
	 */
	nbMoves() {
		return this.moves
	}
}

export { GameState }
