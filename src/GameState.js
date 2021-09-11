class GameState {
	constructor (state) {
		this.WIDTH = 7
		this.HEIGHT = 6

		if (state === undefined) {
			this.board = Array(this.HEIGHT).fill().map(() => Array(this.WIDTH).fill(0))
			this.height = Array(this.WIDTH).fill(0)
			this.moves = 0
		} else {
			this.board = JSON.parse(JSON.stringify(state.board))
			this.height = [...state.height]
			this.moves = state.moves
		}
	}

	canPlay(col) {
		return this.height[col] < this.HEIGHT
	}

	play(col) {
		this.board[col][this.height[col]] = 1 + this.moves % 2
		this.height[col]++
		this.moves++
	}

	isWinningMove(col) {
		const player = 1 + this.moves % 2
		if ( // |
			this.height[col] >= 3
			&& this.board[col][this.height[col]-1] === player
			&& this.board[col][this.height[col]-1] === this.board[col][this.height[col]-2]
			&& this.board[col][this.height[col]-2] === this.board[col][this.height[col]-3]
		) {
			return true
		}
		// X = col
		// Y = this.height[col]
		let combo = 1
		for (let i = 1; i <= 3; i++) {
			if (this.board[col][this.height[col] - i] === player) {
				combo ++
			}
		}
		if (combo > 4) return true
		combo = 0

		for (let i = Math.max(0, col - 3), m = Math.min(col + 3, this.WIDTH); i < m; i++) { // -
			if (this.board[i][this.height[col]] === player) {
				if (combo === 3) return true
				combo++
			} else {
				combo = 0
			}
		}
		combo = 0

		const minusX = col - Math.max(0, col - 3)
		const plusX = Math.min(col + 3, this.WIDTH) - col
		const minusY = this.height[col] - Math.max(0, this.height[col] - 3)
		const plusY = Math.min(this.HEIGHT, this.height[col] + 3) - this.height[col]

		let ul = Math.min(minusX, plusY)
		let dr = Math.min(plusX, minusY)
		for (let x = col - ul, y = this.height[col] + ul, i = 0; i <= ul + dr; i++, x++, y--) { // \
			if (this.board[x][y] === player) {
				if (combo === 3) return true
				combo++
			} else {
				combo = 0
			}
		}
		combo = 0

		let ld = Math.min(minusX, minusY)
		let ur = Math.min(plusX, plusY)
		for (let x = 1, y = 1, i = 0; i <= ld + ur; i++, x++, y++) { // /
			if (this.board[x][y] === player) {
				if (combo === 3) return true
				combo++
			} else {
				combo = 0
			}
		}

		return false
	}

	nbMoves() {
		return this.moves
	}
}

export { GameState }
