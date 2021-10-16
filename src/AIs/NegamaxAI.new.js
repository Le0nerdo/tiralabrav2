import { GameState } from '../GameState.js'
import { TransitionTable } from '../TranspositionTable.js'


/** @class NegamaxAI is an AI that uses negamax to calculate the next move.*/
class NegamaxAI {
	/**
	 * Constructor for NegamaxAI.
	 * 
	 * @param {Object} state The current game state.
	 */
	constructor (state, storageSize = 10 ** 5) {
		this.transitionTable = new TransitionTable(storageSize)
		this.order = new Array(state.WIDTH)
		const halfWidthFloor = ~~(state.WIDTH / 2)
		for (let i = 0; state.WIDTH - 2 > i; i += 2) {
			this.order[state.WIDTH-1-i] = state.WIDTH - 1 - (i / 2)
			this.order[state.WIDTH-2-i] = i / 2
		}

		if (state.WIDTH % 2) {
			this.order[0] = halfWidthFloor
		}
	}

	/**
	 * Gives the next move that the AI does.
	 * 
	 * This is pretty much the same as NegamaxAI.negamax, but returs a the move
	 * corresponding to the highest value, instead of the value.
	 * 
	 * @param {Object} state The current game state.
	 * @returns The next move
	 */
	nextMove (state) {
		for (let i = 0; i < state.WIDTH; i++) {
			if (state.canPlay(i) && state.isWinningMove(i)) {
				return i
			}
		}

		let bestScore = -state.WIDTH * state.HEIGHT
		let bestMove = -1
		for (let a = 0;  state.WIDTH > a; a++) {
			const i = this.order[a]
			if (state.canPlay(i)) {
				const GS2 = new GameState(state)
				GS2.play(i)
				const score = -this.solve(GS2)
				if (bestScore < score) {
					bestScore = score
					bestMove = i
				}
			}
		}
		return bestMove
	}

	solve(state) {
		let min = - (~~(state.WIDTH * state.HEIGHT - state.nbMoves())) /  2
		let max = (~~(state.WIDTH * state.HEIGHT + 1 - state.nbMoves())) / 2

		while (min < max) {
			let med = min + (max - min) / 2
			if (med <= 0 && (min / 2) < med) {
				med = min/2
			} else if (med >= 0 && (max / 2) > med) {
				med = max/2
			}
			const r = this.negamax(state, med, med+1)
			if (r <= med) {
				max = r
			} else {
				min = r
			}

			return min
		}
	}

	/**
	 * Calculates the value of a game state.
	 * 
	 * 0 means that the game state leads to a draw if both players play in an
	 * optimal way.
	 * 
	 * x means that the player whose turn it is wins on x:th last piece, if both
	 * players play in an optimal way.
	 * 
	 * -x means that the other player wins in x:th last piece, if both players
	 * play in an optimal way.
	 * 
	 * @param {*} state The game state to be evaluated.
	 * @param {*} alpha If the value is smaller than this, we are not interested
	 * in it.
	 * @param {*} beta The biggest possible score. (Or we are not interested in
	 * bigger scores.)
	 * @returns The value of the game state.
	 */
	negamax (state, alpha, beta) {
		if (state.nbMoves() === state.WIDTH * state.HEIGHT) return 0

		const key = state.generateKey()
		const stored = this.transitionTable.get(key)
		if (stored) return stored

		let a = alpha
		let b = beta
		let bestPossibleScore = ~~((state.WIDTH * state.HEIGHT + 1 - state.nbMoves()) / 2)
	
		for (let i = 0; i < state.WIDTH; i++) {
			if (state.canPlay(i) && state.isWinningMove(i)) {
				return bestPossibleScore
			}
		}

		if (b > bestPossibleScore - 1) {
			b = bestPossibleScore - 1
			if (a >= b) {
				return b
			}
		}

		for (let j = 0;  state.WIDTH > j; j++) {
			const i = this.order[j]
			if(state.canPlay(i)) {
				const GS2 = new GameState(state)
				GS2.play(i)
				const score = -this.negamax(GS2, -b, -a)
				if (score >= b) {
					return score
				}
				if (score > a) a = score
			}
		}

		this.transitionTable.put(key, a)
		return a
	}

}

export { NegamaxAI }
