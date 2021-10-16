/**
 * @class GameState for managing game states. 
 * 
 * WIth width 7 and height 6 we store the state as bits in the following order:
 * 
 * first row is empty
 * 
 * 5 12 19 26 33 40 47
 * 
 * 4 11 18 25 32 39 46
 * 
 * 3 10 17 24 31 38 45
 * 
 * 2  9 16 23 30 37 44
 * 
 * 1  8 15 22 29 36 43
 * 
 * 0  7 14 21 28 35 42 
 * 
 * The bit order and the operations mostly the same as in
 * http://blog.gamesolver.org/solving-connect-four/06-bitboard/ .
 * 
 * It does not feel exellent to copy methods this exact, but I was not able to
 * do better ones.
 */
class GameState {
	/**
	 * Creates a new game state.
	 *
	 * @param {(number[][]|string|GameState)} [state] Possible starting state as an array or another state to copy from.
	 */
	constructor (state) {
		/** @public */ this.WIDTH = 7
		/** @public */ this.HEIGHT = 6
		/**
		 * Bit representation of the board, where current players pieces are marked
		 * as 1, and all other places 0.
		 * 
		 * @public
		 * @type {BigInt}
		 */
		this.position
		/**
		 * Bit representation of the board, where all pieces are marked as 1, and
		 * other places as 0.
		 *
		 * @public
		 * @type {BigInt}
		 */
		this.mask
		/**
		 * @public
		 * @type number
		 */
		this.moves
		/**
		 * Represents a full gameboard.
		 * 
		 * @private
		 * @type number
		 */
		this.fullMask = BigInt('0b' + ('0' + ('1').repeat(this.HEIGHT)).repeat(this.WIDTH))
		/**
		 * A bitboard of the game that has 1 in the bottom row. Used for generating key.
		 */
		this.bottom = BigInt('0b' + (('0').repeat(this.HEIGHT) + '1').repeat(this.WIDTH))

		if (state === undefined) {
			this.position = BigInt(0)
			this.mask = BigInt(0)
			this.moves = 0
		} else if (Object.prototype.toString.call(state) === '[object Array]'){
			let position = ''
			let mask = ''
			this.moves = 0

			for (let x = 0; x < this.WIDTH; x++) {
				for (let y = 0; y < this.HEIGHT; y++) {
					if (state[x][y] === 0) {
						position += '0'
						mask += '0'
						continue
					}
					if (state[x][y] == 1) {
						position += '1'
					} else {
						position += '0'
					}
					mask += '1'
					this.moves += 1
				}
				if (x != (this.WIDTH - 1)) {
					position += '0'
					mask += '0'
				}
			}

			this.position = BigInt('0b' + position.split('').reverse().join(''))
			this.mask = BigInt('0b' + mask.split('').reverse().join(''))
			/**
			 * XOR between position and mask results in 1:s at all positions that
			 * are 1 in mask, but 0 in position. This means that the result is the
			 * positions of the other player.
			 */
			if (this.moves % 2) {
				this.position ^= this.mask
			}
		} else  if (Object.prototype.toString.call(state) === '[object String]') {
			this.position = BigInt(0)
			this.mask = BigInt(0)
			this.moves = 0
			for (let i = 0; i < state.length; i++) {
				this.play(parseInt(state[i]) - 1)
			}
		} else {
			this.position = state.position
			this.mask = state.mask
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
		/**
		 * Bitwise left shift to get 1 to the position of the highest slot of column.
		 * 
		 * Now bitwise and with mask returns 0 if the highest slot is free. (If the
		 * highest slot of the column is not free AND returns 1 for the slot
		 * resulting in a non zero value)
		 */
		const top_position = BigInt(1) << BigInt(this.HEIGHT - 1 + col * (this.HEIGHT + 1))
		return (this.mask & top_position) === BigInt(0)
	}

	/**
	 * Checks if the game board is full.
	 * 
	 * @returns If game board is full
	 */
	isFull() {
		return (this.mask === this.fullMask)
	}

	/**
	 * Plays into a certain column.
	 * 
	 * @param {number} col The column to be played into.
	 */
	play(col) {
		/**
		 * XOR between position and mask results in 1:s at all positions that
		 * are 1 in mask, but 0 in position. This means that the result is the
		 * positions of the other player.
		 */
		this.position ^= this.mask
		/**
		 * First bitshift is used to get one 1 to the position of the bottom of the column.
		 * 
		 * Now because every column had increasing bitnumbers when it goes up, adding the
		 * bottom bit, will result in a chan till a spot with 0 is filled with 1. For example.
		 * 000111 + 000001 = 001000.
		 * 
		 * At the end or is used to get back the values 1 that were lost in addition. Example.
		 * 000111 | 001000 = 001111
		 */
		this.mask |= this.mask + (BigInt(1) << BigInt(col * (this.HEIGHT + 1)))
		this.moves++
	}

	/**
	 * Checks if the game is won when, the column is played.
	 * 
	 * @param {number} col The column to be checked.
	 * @returns If it is a winning move.
	 */
	isWinningMove(col) {
		/**
		 * Bit shift 1 so that there are 0:s for the amount of height after it. Then reduce 1 to
		 * make all the 0:s ones. After bitshift the 1:s to be at the position of the column.
		 */
		const columnMask = ((BigInt(1) << BigInt(this.HEIGHT)) - BigInt(1)) << BigInt(col * (this.HEIGHT + 1))
		/**
		 * First bitshift is used to get one 1 to the position of the bottom of the column.
		 * 
		 * Now because every column had increasing bitnumbers when it goes up, adding the
		 * bottom bit, will result in a chan till a spot with 0 is filled with 1. For example.
		 * 000111 + 000001 = 001000.
		 * 
		 * And with the column mask will only select the 1 on the column and disregard everything
		 * else.
		 */
		const addedPiece = (this.mask + (BigInt(1) << BigInt(col * (this.HEIGHT + 1)))) & columnMask
		/**
		 * We get the current players new position, by selecting the old 1: from the old position
		 * and the added piece
		 */
		const newPos = this.position | addedPiece

		// - (horizontal)
		/**
		 * We are bitshifting always by multiples of the bitmap height. This means that we move all
		 * rows for the same amount.
		 * 
		 * We do the following for every row, but to keep the explanation simple I use only one row.
		 * 
		 * First we rightshift by one (with zero fill) and then and with the original. The 2 rowns
		 * that we and are
		 * 
		 * a b c d e f g
		 * b c d e f g 0
		 * 
		 * Now we can see that if we get 1 for some value, we know that there is a piece AND there is
		 * also a piece on the right.
		 */
		const hasRightPiece = newPos & (newPos >> BigInt(this.HEIGHT + 1))
		/**
		 * Now with the same idea we shift the result by 2 and know that in there is a piece AND a
		 * piece 2 places to the right.
		 * 
		 * Now if we have a 1 bit. We know that there is a piece 2 to the right. Meaning that we have
		 * 1?1 and because we know that those pieces have a piece 1 to right we know that there is
		 * 1111 meaning 4 in a row.
		 */
		if (hasRightPiece & (hasRightPiece >> BigInt(2 * (this.HEIGHT + 1)))) return true

		// \
		/**
		 * We use the same idea as in horizontal, but now we shift by multiples of height meaning
		 * that we shigt by one less than we would need for rows to stay the same. We get the effect
		 * that we move pieces one row left, but they stay one place too high. This means that we
		 * look diagonals from up left to bottom right.
		 * 
		 * _______
		 * 
		 * _#_____
		 * 
		 * __#____
		 * 
		 * ___#___
		 * 
		 * #___#__
		 * 
		 * _#_____
		 * 
		 * then bitshift by height
		 * 
		 * #______
		 * 
		 * _#_____
		 * 
		 * __#____
		 * 
		 * ___#___
		 * 
		 * #______
		 * 
		 * _______
		 */
		const hasBottomRight = newPos & (newPos >> BigInt(this.HEIGHT))
		if (hasBottomRight & (hasBottomRight >> BigInt(2 * this.HEIGHT))) return true

		// \
		/**
		 * Same as top right to bottom left, but now we shift by one too much for keeping the rows.
		 * This means that the pieces get to a positionn that is one too low. This means that bottom
		 * left to top right diagonals are in the ones we look at now.
		 */
		const hasTopRight = newPos & (newPos >> BigInt(this.HEIGHT + 2))
		if (hasTopRight & (hasTopRight >> BigInt(2 * this.HEIGHT + 4))) return true

		// |
		/**
		 * For the horizontal check we shift by multiples on one. This means that we move the pieces
		 * down.
		 * 
		 * After the first step the 2 top rows are 0:s meaning that we do not get problems with
		 * pieces counting for the wrong columns.
		 */
		const hasAbove = newPos & (newPos >> BigInt(1))
		if (hasAbove & (hasAbove >> BigInt(2))) return true

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

	/**
	 * Returs the game state as an 2D array [column][row]. Where 1 is a red piece
	 * and 2 is a yellow piece.
	 * 
	 * @returns number[][] representing the game state.
	 */
	toArray() {
		const currentPlayer = (this.moves % 2) + 1
		const otherPlayer = currentPlayer === 1 ? 2 : 1

		const rawPosition = this.position.toString(2)
		const rawMask = this.mask.toString(2)
		const position = '0'.repeat((this.HEIGHT + 1) * this.WIDTH - rawPosition.length) + rawPosition
		const mask = '0'.repeat((this.HEIGHT + 1) * this.WIDTH  - rawMask.length) + rawMask

		const board = []
		let column = []
		for(let i = 1; i <= mask.length; i++) {
			if ((!(i % (this.HEIGHT + 1))) && i != 0) {
				board.push([...column])
				column = []
				continue
			}
			if (mask[mask.length - i] === '1') {
				if (position[position.length - i] === '1') {
					column.push(currentPlayer)
				} else {
					column.push(otherPlayer)
				}
			} else {
				column.push(0)
			}
		}
		return board
	}

	/**
	 * Generates a key corresponding to the game state.
	 * 
	 * @returns BigInt
	 */
	generateKey() {
		return this.position + this.mask + this.bottom
	}
}

export { GameState }
