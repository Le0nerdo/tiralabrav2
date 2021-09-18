import { GameState } from '../GameState'

/** Work in progress do not use */
class NegamaxSolver {
	negmax (state) {
		if (state.nbMoves() == state.WIDTH * state.HEIGHT) return 0
	
		for (let i = 0; i < state.WIDTH; i++) {
			if (state.canPlay(i) && state.isWinningMove(i)) {
				return (state.WIDTH * state.Position + 1 - state.nbMoves()) / 2
			}
		}
	
		let bestScore = -state.WIDTH * state.HEIGHT
	
		for (let i = 0; i < state.WIDTH; i++) {
			if(state.canPlay(i)) {
				const GS2 = GameState(state)
				GS2.play(i)
				const score = -this.negmax(GS2)
				if (score > bestScore) bestScore = score
			}
		}
	
		return bestScore
	}

}

export { NegamaxSolver }
